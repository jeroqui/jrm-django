
const langs = [
  "ca",
  "es"
];




// Function of a string to replace a character in it.
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


var app = new Vue({
  el: '#app',
  data: {
    langs: langs,
    lang: langs[0],
    word: "",
    typing: "",
    done: [],
    sentences: sentences,
    globalindex: 0,
    points: 0,
    end: false
  },
  computed: {
    all () {
      return words[this.lang];
    },
    last () {
      return this.done.slice(0, 5);
    },
    plainWord () {
      let plain = this.word.normalize("NFD").replace(/\p{Diacritic}/gu, "");

      for (let i = 0; i < plain.length; i++) {
        let chance = Math.random();

        // Normes per a distorcionar la paraula que es visualitza, deiferenciades per idiomes
        if (this.lang === "ca" || this.lang === "es") {

          // En el cas del català i el castellà, volem intercanviar algunes V i B, i fer desapareixer algunes H.
          // Hi ha una probabilitat asociada a l'operació
          if (plain[i] === 'b' && chance > 0.5) {
            plain = plain.replaceAt(i, 'v');
          }else if (plain[i] === 'v' && chance > 0.5) {
            plain = plain.replaceAt(i, 'b');
          }else if (plain[i] === 'h' && chance > 0.2) {
            plain = plain.slice(0, i) + plain.slice(i+1);
          }
        }
      }
      return plain;
    },
    sentence () {
      let chosen = "";

      // Cerca una frase que contingui la paraula principal
      for (let i = 0; i < this.sentences[this.lang].length; i++){
        if (this.sentences[this.lang][i].toLowerCase().includes(this.word)) {
          chosen = this.sentences[this.lang][i];
          break;
        }
      }

      // La distorciona de la mateixa manera que a la capçañera i la mostra en negreta a la frase.
      chosen = chosen.replace(this.word, "<b>" + this.plainWord + "</b>");

      return chosen;
    }
  },
  methods: {
    pickWord() {
      /*
      Escull una paraula nova d'entre la llista de l'idioma seleccionat.
      */
      let word = "";
      let searching = true;
      let i = 0;

      // Cerca entre les paraules per a no repetir les que ja s'han practicat en aquesta sessió.
      while (searching) {
        word = this.all[Math.floor(Math.random() * this.all.length)];

        searching = false;

        for (let i = 0; i < this.done.length; i++) {
          if (this.done[i] === word) searching = true;
        }

        if (i > 3) {
          break;
        }
        i++;
      }
      return word;
    },
    next() {
      // Comprova la paraula introduida i genera la següent
      if (this.typing.toLowerCase() === this.word.toLowerCase()) {
        this.points++;
      }
      this.done.unshift([this.word, this.typing.toLowerCase() === this.word.toLowerCase(), this.globalindex]);
      this.globalindex++;
      this.word = this.pickWord();
      this.typing = "";
    },
    setup () {
      // Reinicia la paraula actual
      this.word = this.pickWord();
    },
    gameEnd () {
      // Finalitza el joc i mostra l'opció de compartir la puntuació
      this.end = true;
    },
    copy () {
      // Copia les estadistiques al portaretalls

      let text = "punts: " + this.points + " \npercentatge: " + Math.floor(this.points/this.done.length*100) + "% \nerrors: \n";

      for (let i = 0; i < this.done.length; i++) {
        if (!this.done[i][1]) {
          text += "- " + this.done[i][0] + "\n";
        }
      }
      navigator.clipboard.writeText(text);
    },
    link (word) {
      // Genera els enllaços del diec per a cada paraula
      return "https://dlc.iec.cat/Results?DecEntradaText=" + word;
    }
  },
  mounted() {
    this.setup();
  },
  template: `
    <div id="app" class="wrapper">
      <div class="lang">
        <span>Lang:</span>
        <select name="lang" id="lang" v-model="lang" @change="setup">
          <option v-for="lang in langs" :value="lang">{{lang}}</option>
        </select>
      </div>

      <span class="points">Punts: {{points}}</span>
      <h1>{{plainWord}}</h1>
      <transition appear>
        <span v-if="sentence" v-html="sentence"></span>
      </transition>
      <input type="text" v-model="typing" @keyup.enter="next"/>

      <transition-group name="history" tag="div" class="history" appear>
        <div v-for="item in last" :key="item[2]">
          <a :href="link(item[0])" target="_blank" v-if="item[1]" style="color: #34ebbd"> <i class="fa fa-solid fa-check"></i> {{item[0]}}</a>
          <a :href="link(item[0])" target="_blank" v-else style="color: #e01b35"> <i class="fa fa-solid fa-exclamation"></i> {{item[0]}}</a>
        </div>
      </transition-group>

      <button type="submit" @click="gameEnd">Fet!</button>

      <div v-if="end" class="overlay">
        <div class="info">
          <h2>Comparteix</h2>
          <p>
            punts: {{points}}
          </p>
          <p>
            encerts: {{Math.floor(points/done.length*100)}}%
          </p>
          <button @click="copy"><i class="fa fa-solid fa-clipboard"></i>copia</button>
        </div>
      </div>

      <div class="return">
        <a href="/projects/"><i class="fa fa-solid fa-backward"></i> Projectes</a>
      </div>

      <div class="authors">
        <span>Per <b>Jacob Ràfols</b> i</span> <span><b>Traduït</b></span>
      </div>
    </div>
  `
});
