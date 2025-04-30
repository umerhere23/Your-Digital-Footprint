document.addEventListener('DOMContentLoaded', function() {
    // Footprint infographic interaction
    const footprints = document.querySelectorAll('.footprint');
    const infoText = document.getElementById('info-text');
    
    const footprintInfo = {
        'social': 'Social media posts create a significant part of your digital footprint. Even deleted posts may remain in databases.',
        'comments': 'Online comments on articles, videos, or forums contribute to your digital footprint and can be traced back to you.',
        'photos': 'Photos you upload or are tagged in become part of your digital footprint. Metadata in photos can reveal location and time.',
        'searches': 'Your search history is recorded by search engines and can be used to build a profile of your interests.',
        'purchases': 'Online shopping creates a record of your buying habits, preferences, and financial information.'
    };
    
    footprints.forEach(footprint => {
        footprint.addEventListener('click', function() {
            // Remove active class from all footprints
            footprints.forEach(f => f.classList.remove('active'));
            // Add active class to clicked footprint
            this.classList.add('active');
            // Update info text
            const infoType = this.getAttribute('data-info');
            infoText.textContent = footprintInfo[infoType];
        });
    });
    
    // Drag and drop activity
    const dragItems = document.querySelectorAll('.drag-item');
    const dropArea = document.querySelector('.drop-area');
    
    // Add drag event listeners to items
    dragItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });
    
    // Drop area event listeners
    dropArea.addEventListener('dragover', dragOver);
    dropArea.addEventListener('dragleave', dragLeave);
    dropArea.addEventListener('drop', drop);
    
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.dataTransfer.setData('type', e.target.getAttribute('data-type'));
        setTimeout(() => {
            e.target.classList.add('hidden');
        }, 0);
    }
    
    function dragOver(e) {
        e.preventDefault();
        dropArea.classList.add('highlight');
    }
    
    function dragLeave() {
        dropArea.classList.remove('highlight');
    }
    
    function drop(e) {
        e.preventDefault();
        dropArea.classList.remove('highlight');
        
        const text = e.dataTransfer.getData('text/plain');
        const type = e.dataTransfer.getData('type');
        
        const droppedItem = document.createElement('div');
        droppedItem.className = 'drag-item';
        droppedItem.textContent = text;
        droppedItem.setAttribute('data-type', type);
        droppedItem.draggable = true;
        droppedItem.addEventListener('dragstart', dragStart);
        
        dropArea.innerHTML = '';
        dropArea.appendChild(droppedItem);
        dropArea.querySelector('p').classList.add('hidden');
    }
    
     const analyzeBtn = document.getElementById('analyze-btn');
    const analysisResult = document.getElementById('analysis-result');
    const resultText = document.getElementById('result-text');
    
    analyzeBtn.addEventListener('click', function() {
        const droppedItem = dropArea.querySelector('.drag-item');
        
        if (!droppedItem) {
            resultText.textContent = "You haven't added any items to analyze. Drag an item to the drop area first.";
        } else {
            const type = droppedItem.getAttribute('data-type');
            const analysis = {
                'social': "Social media profiles are a major part of digital footprints. Make sure your profiles present you professionally and have appropriate privacy settings.",
                'search': "Search history reveals your interests and can be used to target ads. Consider using private browsing for sensitive searches.",
                'photo': "Photos can reveal more than you intend through metadata and background details. Always check what's visible in photos before sharing.",
                'comment': "Online comments can have lasting impact. Always communicate respectfully as comments may be seen by future employers or colleges.",
                'purchase': "Online purchases create records of your spending habits and personal information. Use secure payment methods and check privacy policies."
            };
            
            resultText.textContent = analysis[type];
        }
        
        analysisResult.style.display = 'block';
    });
    
    // Quiz functionality
    const quizForm = document.getElementById('quiz-form');
    const quizResults = document.getElementById('quiz-results');
    const scoreDisplay = document.getElementById('score');
    const feedbackDisplay = document.getElementById('feedback');
    const saveResultsBtn = document.getElementById('save-results');
    
    const correctAnswers = {
        q1: 'b',
        q2: 'c',
        q3: 'c',
        q4: 'c',
        q5: 'c'
    };
    
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let score = 0;
        const userAnswers = {};
        
        // Get user answers
        for (let i = 1; i <= 5; i++) {
            const questionName = 'q' + i;
            const selectedOption = quizForm.querySelector(`input[name="${questionName}"]:checked`);
            
            if (selectedOption) {
                userAnswers[questionName] = selectedOption.value;
                if (selectedOption.value === correctAnswers[questionName]) {
                    score++;
                }
            }
        }
        
        // Display results
        scoreDisplay.textContent = score;
        
        if (score === 5) {
            feedbackDisplay.textContent = "Excellent! You have a strong understanding of digital footprints.";
        } else if (score >= 3) {
            feedbackDisplay.textContent = "Good job! You understand the basics but could review some concepts.";
        } else {
            feedbackDisplay.textContent = "Consider reviewing the lesson materials to improve your understanding of digital footprints.";
        }
        
        quizResults.style.display = 'block';
        
        // Scroll to results
        quizResults.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Save results to JSON
    saveResultsBtn.addEventListener('click', function() {
        const score = parseInt(scoreDisplay.textContent);
        const date = new Date().toISOString().split('T')[0];
        
        // Create result object
        const result = {
            date: date,
            score: score,
            maxScore: 5,
            topic: "Digital Footprints"
        };
        
         saveToJson(result);
        
        // Provide feedback
        alert(`Your quiz results have been saved!\nScore: ${score}/5\nDate: ${date}`);
    });
    
     function saveToJson(data) {
       
        console.log("Data saved to JSON:", JSON.stringify(data, null, 2));
        
     
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
 }