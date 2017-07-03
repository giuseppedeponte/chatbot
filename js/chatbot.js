// TO DO

// JSON parser

// constant STORYLINE is a JS object containing the
// script for the chat
// Future version will get this as a JSON file

// Create a global user object for storing informations
// The user answers will allow to update the values
$(document).ready(function() {
  $('#play').on('click', function(e){
    CHATBOT.breakTheIce('i0');
    $('#chatbot nav').detach();
  });
});

var user = {
  name: '',
  sex: 'x',
  happy: '',
  bio: false,
  resume: false,
  game: false
};

// Define story flow control functions
// Empty CHATBOT object with properties and methods
CHATBOT = {
  // default values
  user: user,
  bot: 'dr27',
  lang: 'fr',
  start: '',
  end: '',
  currentLine: undefined,
  isStarted: false,
  isPaused: false,
};

CHATBOT.setLimits = function() {
  this.start = STORYLINE[this.lang].start;
  this.end = STORYLINE[this.lang].end;
  return this;
};

// function to change the
var parseID = function(id) {
  var chapter = id[0];
  var line = parseInt(id.substr(1));
  return {
    string: id,
    chapter: chapter,
    line: line,
  };
};

// get a line object from STORYLINE by lang and ID
var searchLine = function(lang, id) {
  var l = parseID(id);
  return STORYLINE[lang][l.chapter][l.line];
};

// Update current line
CHATBOT.setCurrentLine = function(lineId) {
  var line, nextLine, l;
  // if current is undefined default to start
  if (typeof lineId === 'undefined') {
    lineId = this.setLimits().start;
  }
  this.currentLine = searchLine(this.lang, lineId);
  return this;
};

CHATBOT.breakTheIce = function(lineId) {
  lineId = (typeof lineId !== undefined) ? lineId : this.start;
  this.goToNextLine(lineId);
};

// Change line next line
CHATBOT.goToNextLine = function(nextLineId) {
  // if next is undefined default to following line
  if (typeof nextLineId === 'undefined') {
    l = parseID(this.currentLine.id);
    nextLineId = l.chapter + (l.line + 1);
  }
  this.setCurrentLine(nextLineId);
  this.parseLine(this.currentLine);
  return this;
};

// Update the user object
CHATBOT.updateUser = function(property, value) {
  this.user[property] = value;
  return this;
};

// check if the CHATBOT is over
CHATBOT.isOver = function() {
  return this.currentLine.id === this.end;
};

CHATBOT.choose = function(choices) {
  var i, prop, value;

  for (i = 0; i < choices.length; i += 1) {
    prop = choices[i]["prop"];
    value = choices[i]["value"];
    if (this.user[prop] === value || this.user['has' + prop] === value) {
      return choices[i];
    }
  }
};

CHATBOT.think = function(act, text) {
  // wait more or less before moving on according to text length
  var wpm = 180;
  var averageLength = 5;
  var words = text.length / averageLength;
  var bonus = 500;
  var wordsTime = words / wpm * 60 * 1000 + bonus;
  $('#dr27 .think').removeClass('hide');
  this.timeout = setTimeout(function() {
    $('#dr27 .think').addClass('hide');
    act();
  }, wordsTime);
};

CHATBOT.parseText = function(text) {
  var regex = /\B(\#[a-zA-Z]+\b)(?!;)/g;
  var match = text.match(regex);
  var prop;
  if (match) {
    prop = match[0].substr(1);
    value = CHATBOT.user[prop];
    text = text.replace(match[0], value);
  }
  return text;
}

CHATBOT.say = function(speaker, text) {
  // parse text for variables
  text = this.parseText(text);
  // build and add a paragraph to the document
  $(document.createElement('p'))
      .addClass(speaker)
      .text(text)
      .appendTo('#conversation');
};

CHATBOT.anchor = function(speaker, line) {
  var text = line.text;
  var url = line.url;
  // build and add an anchor to the document
  var $p = $(document.createElement('p'))
      .addClass(speaker);

  $(document.createElement('a'))
      .attr('href', url)
      .attr('target', '_blank')
      .text(text)
      .appendTo($p);

  $p.appendTo('#conversation');
};

CHATBOT.show = function(speaker, line) {
  var text = line.text;
  var src = line.src;
  // build and add a figure element to the document
  var $f = $(document.createElement('figure'))
      .addClass(speaker);
  $(document.createElement('img'))
      .attr('src', src)
      .attr('alt', text)
      .appendTo($f);
  $(document.createElement('figcaption'))
      .text(text)
      .appendTo($f);
  $f.appendTo('#conversation');
};

CHATBOT.reply = function(line){
  if (line.store && !this.user['has' + line.store]) {
    this.user[line.store] = line.value;
  }
  line.type = 'answer';
  $('#user figcaption, #input').addClass('hide');
  $('.avatar#dr27 img').removeClass('asking');
  this.parseLine(line);
};

CHATBOT.ask = function(questions) {
  var i;
  var q;
  var $li;
  var $btn;
  var $input;
  var $parent = $('#input');
  var that = this;
  var callback;
  // reset the button list
  $parent.empty();
  $('.avatar#dr27 img').addClass('asking');
  for (i = 0; i < questions.length; i += 1) {
    // build the buttons / inputs and display them
    $li = $(document.createElement('li'));
    q = questions[i];
    switch (q.type) {
      case "radio": {
        // build and show a button
        $btn = $(document.createElement('button'));
        $btn.attr('type', 'button')
            .attr('name', 'button')
            .attr('value', q.next)
            .attr('title', q.text)
            .on('click', q, function(e) {
              that.reply(e.data);
            })
            .text(q.text)
            .appendTo($li)
        $li.appendTo($parent);
        break;
      }
      case "partial": {
        q.text = this.choose(q.text).text;
        // build and show a button
        $btn = $(document.createElement('button'));
        $btn.attr('type', 'button')
            .attr('name', 'button')
            .attr('value', q.next)
            .on('click', q, function(e) {
              that.reply(e.data);
            })
            .text(q.text)
            .appendTo($li)
        $li.appendTo($parent);
        break;
      }
      case "input": {
        $input = $(document.createElement('input'));
        $btn = $(document.createElement('button'));
        $label = $(document.createElement('label'));
        $form = $(document.createElement('form'));
        $label.attr('for', q.store);
        $input.attr('type','text')
            .attr('name', q.store)
            .attr('value', q.value)
            .attr('placeholder', q.text)
            .attr('autocapitalize', 'autocapitalize')
            .appendTo($label);
        $btn.attr('type', 'submit')
            .attr('value', 'ok')
            .text('ok')
            .appendTo($label);

        $label.appendTo($form);
        $form.appendTo($li).on('submit', q, function(e){
          e.preventDefault();
          var check = 'has' + q.store;
          that.user[check] = false;
          if(e.data.text !== '') {
            e.data.text = (e.target[q.store].value);
            e.data.text = e.data.text.trim();
            e.data.text = e.data.text[0].toUpperCase()
                        + e.data.text.substr(1).toLowerCase();
            that.user[q.store] = e.data.text;
            that.user[check] = (that.user[q.store] !== '');
          }
          that.reply(e.data);
        });
        $li.appendTo($parent);
        break;
      }
      default: {
        // same as radio
        break;
      }
    }
  }
  // remove class'hide' from parent element
  $parent.removeClass('hide');
  $('#user figcaption').removeClass('hide');
};

CHATBOT.parseLine = function(line) {
  if (this.isPaused || this.isOver()) {
    return;
  }
  var that = this;
  switch (line.type) {
    // CASES FOR BOT LINES DISPLAY
    case "neutral": {
      this.say(this.bot, line.text);
      this.think(function(){
          that.goToNextLine();
      }, line.text);
      break;
    }
    case "question": {
      this.say(this.bot, line.text);
      this.think(function(){
        that.ask(line.a);
      }, line.text);
      break;
    }
    case "link": {
      this.anchor(this.bot, line);
      this.think(function(){
          that.goToNextLine();
      }, line.text);
      break;
    }
    case "figure": {
      this.show(this.bot, line);
      this.think(function(){
          that.goToNextLine();
      }, line.text);
      break;
    }
    case "partial": {
      var l = this.choose(line.text);
      this.say(this.bot, l.text);
      this.think(function(){
          that.goToNextLine();
      }, line.text);
      break;
    }
    // CASE for the user reply
    case "answer": {
      this.say('user', line.text);
      this.think(function(){
          that.goToNextLine(line.next);
      }, line.text);
    }
    default: {
      break;
    }
  }
};

// Define actions according to line type
CHATBOT.flow = function() {
  if (!this.isStarted) {
    // initialize the CHATBOT
    this.setCurrentLine();
    this.isStarted = true;
  }
  if (this.isPaused) {
    // stop the flow while the user is thinking
    return this;
  }
  if (this.isOver()) {
    // stop the game
    return this;
  }
  this.parseLine(this.currentLine);
};


// Define DOM manipulation functions

// Return a chatbot object with methods
