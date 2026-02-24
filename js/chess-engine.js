// ===== CHESS ENGINE =====
// Chess piece images
const PIECE_IMAGES = {
    wK: 'assets/pieces/wk.png',
    wQ: 'assets/pieces/wq.png',
    wR: 'assets/pieces/wr.png',
    wB: 'assets/pieces/wb.png',
    wN: 'assets/pieces/wn.png',
    wP: 'assets/pieces/wp.png',
    bK: 'assets/pieces/bk.png',
    bQ: 'assets/pieces/bq.png',
    bR: 'assets/pieces/br.png',
    bB: 'assets/pieces/bb.png',
    bN: 'assets/pieces/bn.png',
    bP: 'assets/pieces/bp.png',
};

// Initialize board
function initBoard() {
    const b = Array(8).fill(null).map(() => Array(8).fill(null));
    b[0] = ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'];
    b[1] = ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'];
    b[6] = ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'];
    b[7] = ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'];
    return b;
}

// Initialize cell owners (who conquered which squares)
function initCellOwners() {
    const owners = Array(8).fill(null).map(() => Array(8).fill(null));
    // White pieces belong to p1, black to p2 initially
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (r < 2) owners[r][c] = 'p2'; // Black pieces
            else if (r > 5) owners[r][c] = 'p1'; // White pieces
        }
    }
    return owners;
}

// Check if a move is legal
function isLegalMove(board, fromRow, fromCol, toRow, toCol) {
    const piece = board[fromRow][fromCol];
    if (!piece) return false;
    
    const moves = getLegalMoves(fromRow, fromCol, board);
    return moves.some(([r, c]) => r === toRow && c === toCol);
}

// Get all legal moves for a piece
function getLegalMoves(r, c, b) {
    const piece = b[r][c];
    if (!piece) return [];
    
    const t = piece[1];
    const co = piece[0];
    const moves = [];
    
    const inB = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
    const isE = (r, c) => inB(r, c) && b[r][c] && b[r][c][0] !== co;
    const emp = (r, c) => inB(r, c) && !b[r][c];
    const cG = (r, c) => inB(r, c) && (!b[r][c] || b[r][c][0] !== co);
    
    const sl = (dr, dc) => {
        let nr = r + dr, nc = c + dc;
        while (inB(nr, nc)) {
            if (b[nr][nc]) {
                if (isE(nr, nc)) moves.push([nr, nc]);
                break;
            }
            moves.push([nr, nc]);
            nr += dr;
            nc += dc;
        }
    };
    
    if (t === 'P') {
        const d = co === 'w' ? -1 : 1;
        const sr = co === 'w' ? 6 : 1;
        if (emp(r + d, c)) {
            moves.push([r + d, c]);
            if (r === sr && emp(r + 2 * d, c)) moves.push([r + 2 * d, c]);
        }
        if (isE(r + d, c - 1)) moves.push([r + d, c - 1]);
        if (isE(r + d, c + 1)) moves.push([r + d, c + 1]);
    } else if (t === 'R') {
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dr, dc]) => sl(dr, dc));
    } else if (t === 'B') {
        [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dr, dc]) => sl(dr, dc));
    } else if (t === 'Q') {
        [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dr, dc]) => sl(dr, dc));
    } else if (t === 'N') {
        [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([dr, dc]) => {
            if (cG(r + dr, c + dc)) moves.push([r + dr, c + dc]);
        });
    } else if (t === 'K') {
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([dr, dc]) => {
            if (cG(r + dr, c + dc)) moves.push([r + dr, c + dc]);
        });
        // Castling
        if (co === 'w' && r === 7 && c === 4) {
            if (b[7][7] === 'wR' && !b[7][5] && !b[7][6]) moves.push([7, 6]);
            if (b[7][0] === 'wR' && !b[7][1] && !b[7][2] && !b[7][3]) moves.push([7, 2]);
        }
        if (co === 'b' && r === 0 && c === 4) {
            if (b[0][7] === 'bR' && !b[0][5] && !b[0][6]) moves.push([0, 6]);
            if (b[0][0] === 'bR' && !b[0][1] && !b[0][2] && !b[0][3]) moves.push([0, 2]);
        }
    }
    
    return moves;
}

// Check if king is in check
function isInCheck(board, player) {
    const kingColor = player === 'p1' ? 'w' : 'b';
    let kingPos = null;
    
    // Find king
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (board[r][c] === kingColor + 'K') {
                kingPos = [r, c];
                break;
            }
        }
        if (kingPos) break;
    }
    
    if (!kingPos) return false;
    
    // Check if any opponent piece can capture king
    const opponentColor = player === 'p1' ? 'b' : 'w';
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && piece[0] === opponentColor) {
                const moves = getLegalMoves(r, c, board);
                if (moves.some(([mr, mc]) => mr === kingPos[0] && mc === kingPos[1])) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

// Check if player has any legal moves
function hasAnyLegalMove(board, player) {
    const color = player === 'p1' ? 'w' : 'b';
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && piece[0] === color) {
                const moves = getLegalMoves(r, c, board);
                if (moves.length > 0) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

// Check for checkmate
function isCheckmate(board, player) {
    if (!isInCheck(board, player)) return false;
    return !hasAnyLegalMove(board, player);
}

// Make a move
function makeMove(board, fromRow, fromCol, toRow, toCol) {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = null;
    
    // Pawn promotion
    if (piece === 'wP' && toRow === 0) newBoard[toRow][toCol] = 'wQ';
    if (piece === 'bP' && toRow === 7) newBoard[toRow][toCol] = 'bQ';
    
    return newBoard;
}

// Count controlled squares (pieces owned by each player)
function countControlledSquares(board) {
    let p1 = 0, p2 = 0;
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (board[r][c]) {
                if (board[r][c][0] === 'w') p1++;
                else p2++;
            }
        }
    }
    return { p1, p2 };
}

// Get piece image path
function getPieceImage(piece) {
    return PIECE_IMAGES[piece] || '';
}