
// глобальный обработчик событий, который отслеживает загрузку страницы html
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.getElementById('burger');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');

    // объект, содержащий вопросы и ответы
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];   
    

    let clientWidth = document.documentElement.clientWidth;

    if (clientWidth < 768) {
        burgerBtn.style.display = 'flex';            
    } else {
        burgerBtn.style.display = 'none';
    } 

    window.addEventListener('resize', function() {
        clientWidth = document.documentElement.clientWidth;
        if (clientWidth < 768) {
            burgerBtn.style.display = 'flex';            
        } else {
            burgerBtn.style.display = 'none';
        } 

    });

    burgerBtn.addEventListener('click', function() {
        burgerBtn.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    });

    // обработка открытия/закрытия модального окна
    btnOpenModal.addEventListener('click', () => {        
        modalBlock.classList.add('d-block');
        playTest();

    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burgerBtn.classList.remove('active');
    })

    // функция запуска тестирования
    const playTest = () => {
        const finalAnswers = [];  

        // переменная с номером вопроса
        let numberQuestion = 0;        

        // функция рендеринга контента ответов
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `;               

                formAnswers.appendChild(answerItem);                
            })
        }
        
        // функция рендеринга вопрос+ответ в окне
        const renderQuestions = (indexQuestion) => {            
            formAnswers.innerHTML = '';

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;     
                renderAnswers(indexQuestion);
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
            }

            if (numberQuestion === 0) {
                prevButton.classList.add('d-none');
            }

            if (numberQuestion === questions.length) {
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');

                formAnswers.innerHTML = `
                <div class="form-group">
                    <label for="numberPhone">Enter your number</label>
                    <input type="phone" class="form-control" id="numberPhone">
                </div>

                `;
            }

            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Спасибо что выбрали нас!';
                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);               

            }           
        }
        // запуск функции рендеринга
        renderQuestions(numberQuestion) ;

        const checkAnswer = () => {            
            const obj = {};

            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;               
                }
                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }                
            });
            finalAnswers.push(obj);
        };
               
        // обработчики событий кнопок prev/next
        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;                       
            renderQuestions(numberQuestion);           

        }

        prevButton.onclick = () => {
            numberQuestion--;            
            renderQuestions(numberQuestion);            
        }       
        
        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion); 
            console.log(finalAnswers);
        }
    }

})







