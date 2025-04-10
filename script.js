// 1000 سؤال علمي و 1000 سؤال لفظي
let scienceQuestions = [
    { question: "ما هو ناتج 5 + 7؟", options: ["10", "12", "15", "20"], correctAnswer: "12" },
    { question: "ما هو العنصر الكيميائي الذي يرمز له بـ O؟", options: ["أوكسجين", "هيدروجين", "نيتروجين", "كربون"], correctAnswer: "أوكسجين" },
    // أضف 1000 سؤال علمي هنا...
];

let verbalQuestions = [
    { question: "ما هو مرادف كلمة 'جميل'؟", options: ["وسيم", "قبيح", "شجاع", "ضعيف"], correctAnswer: "وسيم" },
    { question: "ما هو جمع كلمة 'كتاب'؟", options: ["كتب", "أكتاب", "كتابات", "كتابان"], correctAnswer: "كتب" },
    // أضف 1000 سؤال لفظي هنا...
];

// دمج الأسئلة العشوائية
let allQuestions = [...scienceQuestions, ...verbalQuestions];
let currentQuestionIndex = 0;
let timeLeft = 120 * 60; // 120 دقيقة بالثواني
let timer;
let correctAnswers = 0;
let totalQuestions = allQuestions.length;
let studentAnswers = []; // لتخزين إجابات الطالب

// دالة لخلط الأسئلة عشوائيًا
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // تبادل العناصر
    }
}

// بدء الاختبار
function startTest() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("testArea").style.display = "block";
    
    // خلط الأسئلة عشوائيًا
    shuffle(allQuestions);
    
    displayQuestion();
    startTimer();
}

// بدء العد التنازلي
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timeLeft").textContent = `الوقت المتبقي: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("انتهى الوقت!");
            showResults();
        }
    }, 1000);
}

// عرض السؤال الحالي
function displayQuestion() {
    let question = allQuestions[currentQuestionIndex];
    document.getElementById("question").innerHTML = `
        <p>${question.question}</p>
        <div>
            ${question.options.map(option => `<button onclick="checkAnswer('${option}')">${option}</button>`).join('')}
        </div>
    `;
}

// التحقق من الإجابة
function checkAnswer(selectedOption) {
    let correctAnswer = allQuestions[currentQuestionIndex].correctAnswer;
    
    // تخزين إجابة الطالب
    studentAnswers.push({
        question: allQuestions[currentQuestionIndex].question,
        selectedAnswer: selectedOption,
        correctAnswer: correctAnswer
    });
    
    if (selectedOption === correctAnswer) {
        correctAnswers++;
    }
    nextQuestion();
}

// الانتقال إلى السؤال التالي
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        displayQuestion();
    } else {
        clearInterval(timer);
        alert("لقد أكملت الاختبار!");
        showResults();
    }
}

// عرض النتيجة النهائية مع الإجابات الصحيحة
function showResults() {
    let percentage = (correctAnswers / totalQuestions) * 100;
    
    // عرض النتيجة في تنسيق مرتب
    let resultHTML = `<h2>نتائج الاختبار</h2>`;
    resultHTML += `<p>لقد حصلت على ${correctAnswers} من ${totalQuestions} إجابة صحيحة. نسبة النجاح: ${percentage.toFixed(2)}%</p>`;
    
    // عرض الأسئلة مع الإجابات الصحيحة
    resultHTML += `<h3>إجاباتك:</h3>`;
    studentAnswers.forEach(answer => {
        resultHTML += `
            <div>
                <p><strong>السؤال:</strong> ${answer.question}</p>
                <p><strong>إجابتك:</strong> ${answer.selectedAnswer}</p>
                <p><strong>الإجابة الصحيحة:</strong> ${answer.correctAnswer}</p>
            </div>
            <hr>
        `;
    });
    
    // عرض النتيجة النهائية
    document.getElementById("testArea").innerHTML = resultHTML;
}
