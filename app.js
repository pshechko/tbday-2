

let vue = new Vue({
  el: '#app',
  data: {
    activePage: 'quiz', // Початкова активна сторінка - вікторина
    test: true,
    specificId: false,
    pages: {
      quiz: {
        questions: [
          { question: 'Твоє ім’я?', type: 'open' },
          { question: 'Якою мовою тобі краще читати книги:', options: ['Чеською', 'Англійською', 'Українською'], type: 'choice' },
          { question: 'Твій знак зодіаку?', type: 'open' },
          { question: 'Яким книгам ти надаєш перевагу:', options: ['Маленьким', 'Великим'], type: 'choice' },
          { question: 'Який формат книги тобі більше подобається:', options: ['Паперовий', 'Електронний'], type: 'choice' },
          { question: 'Колір волосся?', type: 'open' },
          { question: 'Твій улюблений колір?', type: 'open' },
          { question: 'Чи цікавишся ти тактичною медициною?', options: ['Так', 'Ні'], type: 'choice' },
          { question: 'За скільки секунд ти змогла б накласти турнікет?', type: 'open' },
          { question: 'Що ти більше любиш:', options: ['Банан', 'Груша'], type: 'choice' },
          { question: 'Тобі подобається більше кава чи чай?', options: ['Кава', 'Чай'], type: 'choice' },
          { question: 'Як часто ти читаєш книги про тактичну медицину?', options: ['Дуже часто', 'Час від часу', 'Рідко'], type: 'choice' },
          { question: 'Який твій улюблений кавовий напій?', options: ['Еспресо', 'Фільтр', 'V-60', 'Інший'], type: 'choice' },
          { question: 'Яка твоя улюблена книга?', type: 'open' },
          { question: 'Твоє улюблене місце для читання:', options: ['Вдома', 'В кафе', 'На природі', 'Інше'], type: 'choice' },
          { question: 'Тобі більше подобається читати вранці чи ввечері?', options: ['Вранці', 'Ввечері'], type: 'choice' },
          { question: 'Яка твоя улюблена мова для спілкування?', type: 'open' },
          { question: 'Що ти більше любиш робити у вільний час:', options: ['Читати', 'Гуляти', 'Пити каву з друзями', 'Інше'], type: 'choice' },
          { question: 'Твоє улюблене місце для відпочинку:', options: ['Дім', 'Парк', 'Кафе', 'Подорожі'], type: 'choice' },
          { question: 'Яка твоя улюблена кава:', options: ['Міцна', 'Середня', 'Легка', 'Інше'], type: 'choice' },
          { question: 'Ти віддаєш перевагу каві з молоком чи без?', options: ['З молоком', 'Без молока'], type: 'choice' },
          { question: 'Ти коли-небудь відвідувала курси першої медичної допомоги?', options: ['Так', 'Ні'], type: 'choice' },
          { question: 'Як часто ти готуєш каву вдома?', options: ['Щодня', 'Час від часу', 'Рідко'], type: 'choice' },
          { question: 'Який твій улюблений напій в холодну пору року?', options: ['Кава', 'Чай', 'Гарячий шоколад', 'Інше'], type: 'choice' },
          { question: 'Яка твоя улюблена музика під час читання?', options: ['Класична', 'Джаз', 'Поп', 'Інше'], type: 'choice' },
          { question: 'Ти віддаєш перевагу солодкій чи гіркій каві?', options: ['Солодкій', 'Гіркій'], type: 'choice' },
          { question: 'Яку книжку ти прочитала останньою?', type: 'open' },
          { question: 'Чи подобається тобі обговорювати прочитані книги з друзями?', options: ['Так', 'Ні'], type: 'choice' },
          { question: 'Що ти більше любиш:', options: ['Кава з книгою', 'Кава з друзями'], type: 'choice' },
          { question: 'Як ти зазвичай починаєш свій ранок?', options: ['З кави', 'З чаю', 'З сніданку', 'Інше'], type: 'choice' },
        ],
        currentQuestion: 0,
        openAnswer: "",
        progress: 0
      },
      loader: {
        loading: false, // Вказує, чи завантажується сторінка
        pageTitle: 'Зачекайте, триває аналіз...',
      },
      results: {
        pageTitle: '4 варіанти завантажено, підбираємо найкращий',
        originalGifts: [
          { id: 0, name: 'Apple MacBook Air M2', img: 'https://i.ibb.co/NYV35jf/gift-0.png' },
          { id: 1, name: 'Taktická Medicína 1. díl', img: 'https://i.ibb.co/QKPSjsG/gift-1.png' },
          { id: 2, name: 'Apple iPad Pro 11 + Apple Pencil', img: 'https://i.ibb.co/r02cNwK/gift-2.png' },
          { id: 3, name: 'Кавомашина Delonghi ECAM320.60.B', img: 'https://i.ibb.co/WGQrnMT/gift-3.png' },
        ],
        gifts: [],
        randomGiftId: 1,
        randomGiftIndex: 0,
        giftClasses: '',
        suggestRespin: false,
        spinsLeft: 5,
        // Додайте дані для сторінки результатів тут
      }
    },
    preloadedImages: [], // Store preloaded images
    imageCache: {}, // Cache for preloaded images
  },
  methods: {
    // Методи для взаємодії з вікториною
    submitAnswer(index) {
      const quizPage = this.pages.quiz;
      quizPage.progress = (quizPage.currentQuestion + 1) / quizPage.questions.length * 100;
      quizPage.currentQuestion++;
      if (quizPage.currentQuestion >= quizPage.questions.length) {
        this.loadPage('loader'); // Після відповіді на всі питання показати прелоадер
        setTimeout(() => {
          this.loadPage('results'); // Після 10 секунд перейти на сторінку результатів
        }, 10000);
      }
    },
    submitOpenAnswer(index) {
      const quizPage = this.pages.quiz;
      if (quizPage.openAnswer.trim() !== "") {
        quizPage.progress = (index + 1) / quizPage.questions.length * 100;
        quizPage.openAnswer = "";
        quizPage.currentQuestion++;
        if (quizPage.currentQuestion >= quizPage.questions.length) {
          this.loadPage('loader'); // Після відповіді на всі питання показати прелоадер
          setTimeout(() => {
            this.pages.loader.pageTitle = 'Звужуємо коло пошуку'; 
          }, 3000);
          setTimeout(() => {
            this.pages.loader.pageTitle = 'Знайдено 1 варіант';             
          }, 5000);
          setTimeout(() => {
            this.pages.loader.pageTitle = 'Знайдено 2 варіанти';             
          }, 6500);
          setTimeout(() => {
            this.pages.loader.pageTitle = 'Знайдено 3 варіанти';             
          }, 7000);
          setTimeout(() => {
            this.pages.loader.pageTitle = 'Знайдено 4 варіанти';             
          }, 7300);
          setTimeout(() => {
            this.pages.loader.pageTitle = 'Пошук завершено, завантажуємо';             
          }, 9000);
          setTimeout(() => {
            this.loadPage('results'); // Після 10 секунд перейти на сторінку результатів
          }, 10000);
        }
      } else {
        alert("Будь ласка, введіть вашу відповідь.");
      }
    },
    repeatArrayUntilLength(arr, minLength) {
      const originalLength = arr.length;
      while (arr.length < minLength) {
        arr.push(...arr.slice(0, minLength - arr.length));
      }
      return arr;
    },
    // Завантаження сторінки
    loadPage(pageName) {
      // Встановити активну сторінку на вказану
      
      // Встановити статус завантаження сторінки
      this.pages.loader.loading = pageName === 'loader';

      if(pageName === 'results') {
        //this.pages.results.randomGiftId = Math.random() < 0.5 ? 1 : 3;

        let genId = Math.random() < 0.5 ? 1 : 3;
        let prevGiftId = this.pages.results.randomGiftId;
        
        if(genId === this.pages.results.randomGiftId &&  Math.random() < 0.7)
          this.pages.results.randomGiftId = this.pages.results.randomGiftId === 1 ? 3 : 1;
        else
          this.pages.results.randomGiftId = genId;

        if(this.specificId !== false) {
          this.pages.results.randomGiftId = this.specificId;
        }


        let extendedGifts =  this.repeatArrayUntilLength(this.pages.results.originalGifts, 300).map(g => {g.classes = ''; return g;});
        let randomIndex = -1;

        this.pages.results.suggestRespin = false;
       

        while(this.pages.results.randomGiftId !== extendedGifts[1].id) {
          extendedGifts.shift();
        }
/*
        while(prevGiftId !== extendedGifts[extendedGifts.length - 2].id) {
          extendedGifts.pop();
        }

        console.log(extendedGifts);
*/

        const indices = [];
        
        for (let i = 0; i < extendedGifts.length; i++) {
          if (extendedGifts[i].id === this.pages.results.randomGiftId) {
            indices.push(i);
          }
          
        }

        // Find the second to last index
        randomIndex = indices.length >= 2 ? indices[indices.length - 2] : -1;

        

        //console.log(this.pages.results.randomGiftId, this.pages.results.randomGiftIndex);

        this.pages.results.randomGiftIndex = randomIndex;
        this.pages.results.gifts = extendedGifts;


        //this.activePage = 'loader';
        this.pages.results.giftClasses = '';
        

        setTimeout(() => {
          this.activePage = pageName;

          setTimeout(() => {
            this.pages.results.giftClasses = 'spinning';
          }, 100);

          setTimeout(() => {
            //this.pages.results.giftClasses = 'stop-transition';
            this.pages.results.gifts[randomIndex].classes = 'picked';
          }, 8000);

          setTimeout(() => {
            this.pages.results.pageTitle = 'Вітаємо! Ваш подарунок - ' + this.pages.results.gifts[randomIndex].name;
          }, 8000);

          setTimeout(() => {
            this.pages.results.suggestRespin = true; // Show button after 10 seconds
          }, 15000);

        }, 100);

        return;
      }

      this.activePage = pageName;
    },

    pickSecond(){
      xdialog.confirm('Да-да, я вже біжу, шас тільки закінчу, тут в мене одна... Ой, ви тут?) Ну давайте вже, обирайте свій подарунок. Тільки нікому не кажіть, а то мене звільнять і замінять на ChatGTPT', () => {
      }, {
        title: 'Шо-шо, Ірочка?',
        buttons: {
          macbook: '<button style="" onclick="(vue.confirmGift(0))()" class="xd-button xd-ok">Apple MacBook Air M2</button>',
          book: '<button style="" onclick="(vue.confirmGift(1))()" class="xd-button xd-ok">Taktická Medicína 1. díl</button>',
          ipad: '<button style="" onclick="(vue.confirmGift(2))()" class="xd-button xd-ok">Apple iPad Pro 11 + Apple Pencil</button>',
          coffee: '<button style="" onclick="(vue.confirmGift(3))()" class="xd-button xd-ok">Кавомашина Delonghi ECAM320.60.B</button>',
        }
      });
    },

    pickFirst(){
      xdialog.confirm('Ну навіть якби так можна було, то що ви би обрали? Давайте швидше, в мене скоро обід, сьогодні електрохарчування зі смаком окрошки', () => {
      }, {
        title: '*пасивно-агресивні звуки цокання*',
        buttons: {
          book: '<button style="" onclick="(vue.preConfirmGift(1))()" class="xd-button xd-ok">Taktická Medicína 1. díl</button>',
          coffee: '<button style="" onclick="(vue.preConfirmGift(3))()" class="xd-button xd-ok">Кавомашина Delonghi ECAM320.60.B</button>',
          cancel: 'Тут немає того, чого мені хотілося би'
        },
        oncancel: () => {
          vue.pickSecond();
        }
      });
    },

    preConfirmGift(giftId){
      xdialog.confirm('Ви точно впевнені, що хочете '+this.pages.results.gifts.filter(g => g.id === giftId)[0].name+'? Переобрати не можна буде.', function() {
      }, {
        title: 'ТОЧНО!?',
        buttons: {
          ok: 'так',
          cancel: 'я ще подумаю'
        },
        onok: function(){
          vue.pickGift(giftId);
        },
        oncancel: function(){
          xdialog.confirm('Визначтеся нарешті', () => {
          }, {
            title: 'Та боооже',
            buttons: {
              book: '<button style="" onclick="(vue.confirmGift(1))()" class="xd-button xd-ok">Taktická Medicína 1. díl</button>',
              coffee: '<button style="" onclick="(vue.confirmGift(3))()" class="xd-button xd-ok">Кавомашина Delonghi ECAM320.60.B</button>',
              cancel: 'Тут немає того, чого мені хотілося би',
            },
            oncancel: function(){
              vue.pickSecond();
            }
          });
        }
      });
      
    },

    confirmGift(giftId){
      xdialog.confirm('Ви точно впевнені, що хочете '+this.pages.results.gifts.filter(g => g.id === giftId)[0].name+'? Переобрати не можна буде.', function() {
      }, {
        title: 'ТОЧНО!?',
        buttons: {
          ok: 'так',
          cancel: 'я ще подумаю'
        },
        onok: function(){
          vue.pickGift(giftId);
        },
        oncancel: function(){
          xdialog.confirm('Ірочка, я даганю, ага. Обирайте вже', () => {
          }, {
            title: 'Та боооже',
            buttons: {
              macbook: '<button style="" onclick="(vue.confirmGift(0))()" class="xd-button xd-ok">Apple MacBook Air M2</button>',
              book: '<button style="" onclick="(vue.confirmGift(1))()" class="xd-button xd-ok">Taktická Medicína 1. díl</button>',
              ipad: '<button style="" onclick="(vue.confirmGift(2))()" class="xd-button xd-ok">Apple iPad Pro 11 + Apple Pencil</button>',
              coffee: '<button style="" onclick="(vue.confirmGift(3))()" class="xd-button xd-ok">Кавомашина Delonghi ECAM320.60.B</button>',
            }
          });
        }
      });
      
    },

    pickGift(giftId) {
      this.reloadResults(giftId);
      console.log(giftId);
    },


    reloadResults(specificId = false) {

      if(specificId !== false){
        this.pages.results.spinsLeft = 2;
        this.specificId = specificId;
      }

      if(--this.pages.results.spinsLeft <= 0) {

        function youLoveIt(){
          xdialog.confirm('Ви неодмінно звикнете до свого подарунка', function() {
          }, {
            title: 'Ну так і всьо)',
            buttons: {
              ok: 'Добре',
             
            },
          });
        }

        let v = this;

        
        xdialog.confirm('На жаль всі спроби вичерпано(', () => {
          // do work here if ok/yes selected...
          console.info('Done!');
        }, {
          
          title: 'О ні!',
          buttons: {
            ok: 'Ну ладно',
            cancel: 'Не ладно',
           
          },
          oncancel: () => {
            xdialog.confirm('Вам не подобається?', () => {
            }, {
              
              title: 'Тобто?',
              buttons: {
                ok: 'Подобається',
                cancel: 'Норм',
               
              },
              onok: () => {

                xdialog.confirm('Раді, що вам подобається', () => {
                }, {
                  title: 'Ну так і всьо)',
                  buttons: {
                    ok: 'І я рада',
                   
                  },
                });
              },

              oncancel: () => {
                xdialog.confirm('Система без помилок проаналізувала ваші відповіді, та обрала найркаший подарунок', () => {
                }, {
                  title: 'Такого не може бути',
                  buttons: {
                    ok: 'Добре',
                    cancel: 'А може...',
                  },
                  onok: () => {

                    youLoveIt();

                  },
                  oncancel: () => {
                    
                    xdialog.confirm('Думаєте, система помилилася?', () => {
                    }, {
                      title: 'Що може?',
                      buttons: {
                        ok: 'Так',
                       
                      },
                      onok: () => {

                        xdialog.confirm('Система працює, як швейцарський годинник, вона не може помилятися', () => {
                        }, {
                          title: 'Не може бути',
                          buttons: {
                            ok: 'І все ж...',
                           
                          },
                          onok: () => {
                            xdialog.confirm('Ви хочете обрати самі подарунок?', () => {
                            }, {
                              title: 'Ну і що ви пропонуєте?',
                              buttons: {
                                ok: 'Ні',
                                cancel: 'Так',
                              },
                              onok: () => {

                                youLoveIt();

                              },
                              oncancel: () => {

                                xdialog.confirm('Це проти правил', () => {
                                }, {
                                  title: 'Ну не знаю',
                                  buttons: {
                                    ok: 'Ну ладно',
                                    cancel: 'Ну бумласка'
                                  },
                                  onok: function (){
                                    youLoveIt();
                                  },
                                  oncancel: () => {
                                    
                                    vue.pickFirst();
                                    

                                  }
                                });

                              }
                            });
                          }
                        });

                      }
                    });

                  }
                });
              }
            });
          }
        });
        return;
      }

      this.pages.results.pageTitle = 'Переобираємо';
      this.pages.results.giftClasses = 'stop-transition';

      setTimeout(() => {
        this.loadPage('results');
        //this.pages.results.giftClasses = 'spinning';
      }, 10);
    },

    preloadImages() {
      const imageUrls = this.pages.results.gifts.map(gift => gift.img);
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        this.imageCache[url] = img; // Cache the preloaded image
      });
    },
    getImageUrl(url) {
      return this.imageCache[url] ? this.imageCache[url].src : url;
    },
    
  },
  mounted() {
      this.preloadImages();
      console.log('mounted');
    }
});
