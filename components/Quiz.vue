<template>
  <div>
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    <div class="question-block" v-for="(question, index) in questions" :key="index">
      <div class="question">{{ question.question }}</div>
      <template v-if="question.type === 'choice'">
        <div class="options">
          <button v-for="(option, i) in question.options" :key="i" @click="selectOption(index, option)">{{ option }}</button>
        </div>
      </template>
      <template v-else-if="question.type === 'open'">
        <form @submit.prevent="submitOpenAnswer(index)">
          <input type="text" v-model="openAnswer" placeholder="Введіть вашу відповідь" />
          <button type="submit">OK</button>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        questions: [
        { question: 'Твоє ім’я?', type: 'open' },
        /*{ question: 'Якою мовою тобі краще читати книги:', options: ['Чеською', 'Англійською', 'Українською'], type: 'choice' },
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
        { question: 'Який твій улюблений кавовий напій?', options: ['Еспресо', 'Лате', 'Капучино', 'Інший'], type: 'choice' },
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
        { question: 'Як ти зазвичай починаєш свій ранок?', options: ['З кави', 'З чаю', 'З сніданку', 'Інше'], type: 'choice' },*/
        ],*/
      ],
      currentQuestion: 0,
      openAnswer: "",
      progress: 0
    };
  },
  methods: {
    selectOption(index, option) {
      this.progress = (this.currentQuestion + 1) / this.questions.length * 100;
      this.currentQuestion++;
    },
    submitOpenAnswer(index) {
      if (this.openAnswer.trim() !== "") {
        this.progress = (index + 1) / this.questions.length * 100;
        this.openAnswer = "";
      } else {
        alert("Будь ласка, введіть вашу відповідь.");
      }
    }
  }
};
</script>