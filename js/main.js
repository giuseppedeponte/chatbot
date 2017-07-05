/* global STORYLINE, $, CHATBOT */
/* eslint one-var:0, no-var:0, no-unused-vars:0 */
var CHATBOT = (function(storyline) {
  var user;
  var story;
  var chatbot;
  var display;
  var lang = $('html').attr('lang') || 'fr';
  // DATA
  // DATA.story

  story = {
    lang: lang,
    start: storyline['fr'].start,
    end: storyline['fr'].end,
    currentLine: storyline['fr'].start,
    isStarted: false,
    isPaused: false,
    isOver: function() {
      return (this.currentLine === this.end);
    },
  };
  var parseId = function(id) {
    var chapterId = id[0],
        lineId = parseInt(id.substr(1));
    return {
      string: id,
      chapter: chapterId,
      line: lineId,
    };
  };
  story.searchLine = function(id) {
    var l = parseId(id);
    return storyline['fr'][l.chapter][l.line];
  };
  story.goToNextLine = function(nextId) {
    var l;
    if (!story.isStarted) {
      nextId = this.start;
      story.isStarted = true;
    }
    if (typeof nextId === 'undefined') {
      l = parseId(this.currentLine.id);
      nextId = l.chapter + (l.line + 1);
    }
    this.currentLine = this.searchLine(nextId);
    return this.currentLine;
  };
  // DATA.user
  user = {
    name: '',
    sex: 'x',
    isHappy: '',
    mood: 'formal',
    bio: false,
    resume: false,
    game: false,
  };
  user.update = function(prop, value) {
    this[prop] = value;
    return this;
  };
  user.read = function(prop) {
    return this.hasOwnProperty(prop) ? this[prop] : false;
  };
  // CHATBOT
  chatbot = {
    name: 'dr27',
  };
  chatbot.talk = function(lineId) {
    story.goToNextLine(lineId);
    this.parseLine(story.currentLine);
  };
  chatbot.breakTheIce = function(el) {
    $(el).detach();
    this.talk();
  };
  chatbot.parseText = function(text) {
    var regex = /\B(#[a-zA-Z]+\b)(?!;)/g,
        match = text.match(regex),
        prop,
        value;
    if (match) {
      prop = match[0].substr(1);
      value = user.read(prop) || '';
      text = text.replace(match[0], value);
    }
    return text;
  };
  chatbot.say = function(speaker, text) {
    text = this.parseText(text);
    display.p(speaker, text);
  };
  chatbot.link = function(speaker, line) {
    display.a(speaker, line.text, line.url);
  };
  chatbot.illustrate = function(speaker, line) {
    display.figure(speaker, line.text, line.src);
  };
  chatbot.choose = function(choices) {
    var i, prop, value;
    for (i = 0; i < choices.length; i += 1) {
      prop = choices[i]['prop'];
      value = choices[i]['value'];
      if (user.read(prop) === value || user.read('has' + prop) === value) {
        return choices[i];
      }
    }
  };
  chatbot.think = function(action, text) {
    var that = this,
        wpm = 180,
        averageLength = 5,
        words = text.length / averageLength,
        bonus = 500,
        wordTime = words / wpm * 60 * 1000 + bonus;
    display.startThinking(this.name);
    this.timeout = setTimeout(function() {
      display.stopThinking(that.name);
      action();
    }, wordTime);
  };
  chatbot.ask = function(questions) {
    var i, q;
    display.resetInput();
    for (i = 0; i < questions.length; i += 1) {
      q = questions[i];
      switch (q.type) {
        case 'radio': {
          display.button(q);
          break;
        }
        case 'partial': {
          q.text = this.choose(q.text).text;
          display.button(q);
          break;
        }
        case 'input': {
          display.input(q);
          break;
        }
        default: {
          break;
        }
      }
    }
    display.showInput();
    display.asking(this.name);
  };
  chatbot.listen = function(line) {
    if (line.store && !user['has' + line.store]) {
      user.update(line.store, line.value);
    }
    line.type = 'answer';
    display.hideInput();
    display.asking(this.name);
    this.parseLine(line);
  };
  chatbot.parseLine = function(line) {
    var that = this;
    if (story.isPaused || story.isOver()) {
      return;
    }
    switch (line.type) {
      // CASES FOR BOT LINES DISPLAY
      case 'neutral': {
        this.say(this.name, line.text);
        this.think(function() {
            that.talk();
        }, line.text);
        break;
      }
      case 'question': {
        this.say(this.name, line.text);
        this.think(function() {
          that.ask(line.a);
        }, line.text);
        break;
      }
      case 'link': {
        this.link(this.name, line);
        this.think(function() {
            that.talk();
        }, line.text);
        break;
      }
      case 'figure': {
        this.illustrate(this.name, line);
        this.think(function() {
            that.talk();
        }, line.text);
        break;
      }
      case 'partial': {
        var l = this.choose(line.text);
        this.say(this.name, l.text);
        this.think(function() {
            that.talk();
        }, line.text);
        break;
      }
      case 'game': {
        display.showGame();
        break;
      }
      // CASE FOR USER REPLY
      case 'answer': {
        this.say('user', line.text);
        this.think(function() {
            that.talk(line.next);
        }, line.text);
        break;
      }
      default: {
        break;
      }
    }
  };
  chatbot.closeGame = function() {
    var that = this;
    display.hideGame();
    that.talk();
  };
  // DISPLAY
  display = {
    wrapper: 'chatbot',
    convId: '#conversation',
    inputId: '#input',
    brain: function(speaker) {
      return $('#' + speaker + ' .think');
    },
    face: function(speaker) {
      return $('#' + speaker + ' img');
    },
  };
  display.setMinHeight = function() {
    var h1 = $('#input').height(),
        h2 = $('#dr27').height(),
        h3 = $('#user').height(),
        ph = $('#' + this.wrapper).height(),
        h = ph - h1 + h2 + h3;
    $(this.convId).height(h);
    this.stickToBottom();
  };
  $(document).ready(function() {
    display.setMinHeight();
  });
  $(window).resize(function() {
    display.setMinHeight();
  });
  display.stickToBottom = function() {
    var out = document.getElementById(this.wrapper);
    out.scrollTop = out.scrollHeight - out.clientHeight;
  };
  display.p = function(speaker, text) {
    $(document.createElement('p'))
        .addClass(speaker)
        .text(text)
        .appendTo(this.convId);
    this.stickToBottom();
  };
  display.a = function(speaker, text, url) {
    var $p = $(document.createElement('p'));
    $(document.createElement('a'))
        .attr('href', url)
        .attr('target', '_blank')
        .text(text)
        .appendTo($p);
    $p.addClass(speaker).appendTo(this.convId);
    this.stickToBottom();
  };
  display.figure = function(speaker, text, src) {
    var $f = $(document.createElement('figure'));
    $(document.createElement('img'))
        .attr('src', src)
        .attr('alt', text)
        .appendTo($f);
    $(document.createElement('figcaption'))
        .text(text)
        .appendTo($f);
    $f.addClass(speaker).appendTo(this.convId);
    this.stickToBottom();
  };
  display.asking = function(speaker) {
    $('#' + speaker + ' img').toggleClass('asking');
  };
  display.startThinking = function(speaker) {
    this.brain(speaker).removeClass('hide');
  };
  display.stopThinking = function(speaker) {
    this.brain(speaker).addClass('hide');
  };
  display.resetInput = function() {
    $(this.inputId).empty();
  };
  display.hideInput = function() {
    this.stickToBottom();
    $(this.inputId).addClass('hide');
    this.stopThinking('user');
  };
  display.showInput = function() {
    $(this.inputId).removeClass('hide');
    this.stickToBottom();
    this.startThinking('user');
  };
  display.button = function(q) {
    var $li = $(document.createElement('li')),
        $btn = $(document.createElement('button'));
    $btn.attr('type', 'button')
        .attr('name', 'button')
        .attr('value', q.next)
        .attr('title', q.text)
        .on('click', q, function(e) {
          chatbot.listen(e.data);
        })
        .text(q.text)
        .appendTo($li);
    $li.appendTo(this.inputId);
  };
  display.input = function(q) {
    var $li = $(document.createElement('li')),
        $input = $(document.createElement('input')),
        $btn = $(document.createElement('button')),
        $label = $(document.createElement('label')),
        $form = $(document.createElement('form'));
    $label.attr('for', q.store);
    $input.attr('type', 'text')
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
    $form.appendTo($li).on('submit', q, function(e) {
      e.preventDefault();
      var check = 'has' + q.store;
      user.update(check, false);
      if (e.data.text !== '') {
        e.data.text = (e.target[q.store].value);
        e.data.text = e.data.text.trim();
        e.data.text = e.data.text[0].toUpperCase()
                    + e.data.text.substr(1).toLowerCase();
        user.update(q.store, e.data.text);
        user.update(check, (user.read(q.store) !== ''));
      }
      chatbot.listen(e.data);
    });
    $li.appendTo(this.inputId);
  };
  display.hideGame = function() {
    $('#game').addClass('hide');
  };
  display.showGame = function() {
    $('#game').removeClass('hide');
  };

  return chatbot;
}(STORYLINE));
