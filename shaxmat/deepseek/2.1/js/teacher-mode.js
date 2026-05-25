// ===== TEACHER MODE =====
let editingQuestionIndex = -1;

// Toggle teacher mode panel
function toggleTeacherMode() {
    const panel = document.getElementById('teacher-panel');
    const overlay = document.getElementById('teacher-overlay');
    
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (panel.classList.contains('active')) {
        renderQuestionList();
    }
    
    if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
}

// Render question list in teacher mode
function renderQuestionList() {
    const list = document.getElementById('question-list');
    const allQuestions = getAllQuestions();
    
    list.innerHTML = '';
    
    allQuestions.forEach((q, index) => {
        const item = document.createElement('div');
        item.className = 'question-item';
        
        // Determine if this is a base question or custom
        const isBase = index < BASE_QUESTIONS.length;
        
        const text = document.createElement('div');
        text.className = 'question-text';
        text.innerHTML = `<strong>${index + 1}.</strong> ${q.q} <span style="color: ${isBase ? '#888' : 'var(--accent)'}">(${q.difficulty})</span>`;
        
        const actions = document.createElement('div');
        actions.className = 'question-actions';
        
        if (!isBase) {
            // Only custom questions can be edited/deleted
            const editBtn = document.createElement('button');
            editBtn.className = 'question-edit';
            editBtn.textContent = '✎';
            editBtn.onclick = () => editQuestion(index);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'question-delete';
            deleteBtn.textContent = '✕';
            deleteBtn.onclick = () => deleteQuestion(index);
            
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
        } else {
            // Base questions are read-only
            const lockBtn = document.createElement('button');
            lockBtn.className = 'question-edit';
            lockBtn.textContent = '🔒';
            lockBtn.style.opacity = '0.5';
            lockBtn.disabled = true;
            actions.appendChild(lockBtn);
        }
        
        item.appendChild(text);
        item.appendChild(actions);
        list.appendChild(item);
    });
}

// Add new question from teacher mode
function addTeacherQuestion() {
    const question = document.getElementById('new-question').value.trim();
    const opt1 = document.getElementById('new-opt1').value.trim();
    const opt2 = document.getElementById('new-opt2').value.trim();
    const opt3 = document.getElementById('new-opt3').value.trim();
    const opt4 = document.getElementById('new-opt4').value.trim();
    const difficulty = document.getElementById('new-difficulty').value;
    
    if (!question || !opt1 || !opt2) {
        alert('Iltimos, savol va kamida 2 variantni kiriting!');
        return;
    }
    
    const options = [opt1, opt2];
    if (opt3) options.push(opt3);
    if (opt4) options.push(opt4);
    
    const newQuestion = {
        q: question,
        options: options,
        correct: 0, // First option is always correct
        difficulty: difficulty
    };
    
    if (editingQuestionIndex >= 0 && editingQuestionIndex >= BASE_QUESTIONS.length) {
        // Edit existing custom question
        const customIndex = editingQuestionIndex - BASE_QUESTIONS.length;
        customQuestions[customIndex] = newQuestion;
        editingQuestionIndex = -1;
    } else {
        // Add new question
        customQuestions.push(newQuestion);
    }
    
    saveCustomQuestions();
    clearTeacherForm();
    renderQuestionList();
    
    if (AudioSystem && AudioSystem.play) AudioSystem.play('correct');
    alert('Savol muvaffaqiyatli qo\'shildi!');
}

// Edit question
function editQuestion(index) {
    if (index < BASE_QUESTIONS.length) {
        alert('Asosiy savollarni tahrirlash mumkin emas!');
        return;
    }
    
    const allQuestions = getAllQuestions();
    const q = allQuestions[index];
    
    document.getElementById('new-question').value = q.q;
    document.getElementById('new-opt1').value = q.options[0] || '';
    document.getElementById('new-opt2').value = q.options[1] || '';
    document.getElementById('new-opt3').value = q.options[2] || '';
    document.getElementById('new-opt4').value = q.options[3] || '';
    document.getElementById('new-difficulty').value = q.difficulty;
    
    editingQuestionIndex = index;
    
    if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
}

// Delete question
function deleteQuestion(index) {
    if (index < BASE_QUESTIONS.length) {
        alert('Asosiy savollarni o\'chirish mumkin emas!');
        return;
    }
    
    if (confirm('Bu savolni o\'chirishni xohlaysizmi?')) {
        const customIndex = index - BASE_QUESTIONS.length;
        customQuestions.splice(customIndex, 1);
        saveCustomQuestions();
        renderQuestionList();
        if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
        alert('Savol o\'chirildi!');
    }
}

// Clear teacher form
function clearTeacherForm() {
    document.getElementById('new-question').value = '';
    document.getElementById('new-opt1').value = '';
    document.getElementById('new-opt2').value = '';
    document.getElementById('new-opt3').value = '';
    document.getElementById('new-opt4').value = '';
    document.getElementById('new-difficulty').value = 'medium';
    editingQuestionIndex = -1;
}

// Export questions to JSON
function exportQuestions() {
    const data = {
        custom: customQuestions
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'strategiya-custom-questions.json';
    a.click();
    URL.revokeObjectURL(url);
    
    if (AudioSystem && AudioSystem.play) AudioSystem.play('click');
    alert('Savollar eksport qilindi!');
}

// Import questions from JSON
function importQuestions(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.custom && Array.isArray(data.custom)) {
                // Merge with existing custom questions
                customQuestions = [...customQuestions, ...data.custom];
                saveCustomQuestions();
                renderQuestionList();
                if (AudioSystem && AudioSystem.play) AudioSystem.play('correct');
                alert(`${data.custom.length} ta savol muvaffaqiyatli import qilindi!`);
            } else {
                alert('Fayl formati noto\'g\'ri!');
            }
        } catch (err) {
            alert('Fayl formati noto\'g\'ri!');
            if (AudioSystem && AudioSystem.play) AudioSystem.play('wrong');
        }
    };
    reader.readAsText(file);
    
    // Clear input
    event.target.value = '';
}