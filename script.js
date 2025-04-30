document.querySelectorAll('.footprint').forEach(footprint => {
    footprint.addEventListener('click', function() {
        document.querySelector('.footprint.active')?.classList.remove('active');
        this.classList.add('active');
        const infoText = document.getElementById('info-text');
        const type = this.getAttribute('data-info');
        const infoMap = {
            'social': 'Social media posts create a significant part of your digital footprint. Even "private" accounts can be screenshotted and shared. Colleges and employers often review applicants\' social media profiles.',
            'comments': 'Online comments on articles, videos, or forums contribute to your digital footprint. Thoughtful comments can demonstrate expertise, while negative comments can harm your reputation.',
            'photos': 'Photos you upload or are tagged in create visual evidence of your digital footprint. Remember that facial recognition technology can link photos to your identity across platforms.',
            'searches': 'Your search history reveals your interests and concerns. While typically private, data breaches or shared devices can expose this information.',
            'purchases': 'Online shopping creates a record of your buying habits, preferences, and financial information. This data is often used for targeted advertising.',
            'location': 'Location data from check-ins, maps, or photos with geotags reveals where you live, work, and spend time, potentially compromising your physical privacy.',
            'apps': 'The apps you use and how you use them contribute to your digital footprint. Many apps collect extensive data about your behavior and preferences.',
            'emails': 'Emails create a permanent record of your communications. Even deleted emails may exist in backups or recipients\' accounts indefinitely.'
        };
        infoText.textContent = infoMap[type] || 'Click on the footprints above to learn what contributes to your digital footprint.';
    });
});

const dragItems = document.querySelectorAll('.drag-item');
const dropArea = document.querySelector('.drop-area');

dragItems.forEach(item => {
    item.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', this.dataset.type);
        setTimeout(() => this.classList.add('dragging'), 0);
    });

    item.addEventListener('dragend', function() {
        this.classList.remove('dragging');
    });
});

dropArea.addEventListener('dragover', e => {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', e => {
    e.preventDefault();
    dropArea.classList.remove('highlight');
    const type = e.dataTransfer.getData('text/plain');
    const draggedItem = document.querySelector(`.drag-item[data-type="${type}"]`);
    if (!dropArea.querySelector(`[data-type="${type}"]`)) {
        const clone = draggedItem.cloneNode(true);
        clone.setAttribute('draggable', 'false');
        clone.classList.remove('drag-item');
        clone.classList.add('dropped-item');
        clone.style.cursor = 'default';

        const removeBtn = document.createElement('span');
        removeBtn.innerHTML = ' <i class="fas fa-times"></i>';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.color = 'red';
        removeBtn.addEventListener('click', function() {
            this.parentElement.remove();
        });

        clone.appendChild(removeBtn);
        dropArea.appendChild(clone);
        dropArea.querySelector('p').style.display = 'none';
    }
});

document.getElementById('analyze-btn').addEventListener('click', function() {
    const droppedItems = document.querySelectorAll('.dropped-item');
    const resultText = document.getElementById('result-text');
    const analysisResult = document.getElementById('analysis-result');

    if (droppedItems.length === 0) {
        resultText.innerHTML = '<p class="warning"><i class="fas fa-exclamation-triangle"></i> You haven\'t added any items to analyze! Drag some items to the drop area first.</p>';
    } else {
        let footprintSize = '';
        let privacyLevel = '';

        if (droppedItems.length <= 2) {
            footprintSize = 'small';
            privacyLevel = 'relatively private';
        } else if (droppedItems.length <= 4) {
            footprintSize = 'moderate';
            privacyLevel = 'somewhat exposed';
        } else {
            footprintSize = 'large';
            privacyLevel = 'very exposed';
        }

        resultText.innerHTML = `
            <p>Your digital footprint analysis shows:</p>
            <ul>
                <li><i class="fas fa-${footprintSize === 'small' ? 'check-circle' : 'exclamation-circle'}"></i> <strong>Size:</strong> ${footprintSize} (${droppedItems.length} major components identified)</li>
                <li><i class="fas fa-${privacyLevel.includes('private') ? 'check-circle' : 'exclamation-circle'}"></i> <strong>Privacy Level:</strong> Your online presence is ${privacyLevel}</li>
                <li><i class="fas fa-lightbulb"></i> <strong>Recommendation:</strong> ${getRecommendation(footprintSize, privacyLevel)}</li>
            </ul>
        `;
    }

    analysisResult.classList.remove('hidden');
});

function getRecommendation(size, privacy) {
    if (size === 'small' && privacy.includes('private')) {
        return "You're doing great! Keep being mindful of what you share online.";
    } else if (size === 'moderate') {
        return "Consider reviewing your privacy settings and being more selective about what you share.";
    } else {
        return "Your digital footprint is quite extensive. It might be time to audit your online presence and remove unnecessary personal information.";
    }
}

document.getElementById('reset-btn')?.addEventListener('click', function() {
    document.querySelectorAll('.dropped-item').forEach(item => item.remove());
    dropArea.querySelector('p').style.display = 'block';
    document.getElementById('analysis-result').classList.add('hidden');
});

document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const answers = {
        q1: 'b',
        q2: 'c',
        q3: 'c',
        q4: 'c',
        q5: 'c'
    };

    let score = 0;
    let userAnswers = {};

    for (let question in answers) {
        const selected = this.querySelector(`input[name="${question}"]:checked`);
        if (selected) {
            userAnswers[question] = selected.value;
            if (selected.value === answers[question]) {
                score++;
            }
        }
    }

    const quizResults = document.getElementById('quiz-results');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    const userScoreElement = document.getElementById('user-score');
    const currentUserRow = document.getElementById('current-user-row');
    const leaderboardMessage = document.getElementById('leaderboard-message');

    scoreElement.textContent = score;
    userScoreElement.textContent = `${score}/5`;

    const circle = document.getElementById('score-circle');
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (score / 5) * circumference;
    circle.style.strokeDashoffset = offset;

    if (score === 5) {
        feedbackElement.innerHTML = '<p><i class="fas fa-check-circle"></i> Excellent! You have a strong understanding of digital footprints.</p>';
    } else if (score >= 3) {
        feedbackElement.innerHTML = '<p><i class="fas fa-thumbs-up"></i> Good job! You understand the basics but could review some concepts.</p>';
    } else {
        feedbackElement.innerHTML = '<p><i class="fas fa-book"></i> Review the lesson materials to improve your understanding of digital footprints.</p>';
    }

    quizResults.classList.remove('hidden');
    currentUserRow.classList.remove('hidden');
    leaderboardMessage.classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('leaderboard').scrollIntoView({ behavior: 'smooth' });
    }, 1000);

    const quizResultsJSON = {
        score: score,
        total: 5,
        answers: userAnswers,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('quizResults', JSON.stringify(quizResultsJSON));
});

document.getElementById('save-results')?.addEventListener('click', function() {
    alert('Your quiz results have been saved to your profile!');
});
