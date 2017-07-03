$(document).ready = (function(storyline) {
  var user = {
    name: '',
    gender: '',
    isHappy: true,
    bio: false,
    resume: false,
    game: false
  };

  var chatbot = {
    story: storyline,
    user: user,
    lang: $('html').attr('lang') || 'fr',
    start: this.storyline[this.lang].start,
    end: this.storyline[this.lang].end,
    currentLine: this.start,
    isStarted: false,
    isPaused: false
  };

  /** Function to read a line id
   *  @return {Object} an id object separating chapter and line
   *  @param {string} id The id to be parsed
   */
  var parseID = function(id) {
    var chapter = id[0],
        line = parseInt(id.substr(1));
    return {
      string: id,
      chapter: chapter,
      line: line,
    };
  };
  /**
   * Function to search a line by id
   * @return {object} the line with the given id
   * @param {object} story the object representing the story
   * @param {string} lang the language to be used
   * @param {string} id the line string id
   */
  var searchLine = function(story, lang, id) {
      var l = parseID(id);
      return story[lang][l.chapter][l.line];
  };
  /**
   * Method to change current line
   * @return {object} the parent object
   * @param {string} nextLine the line id, default is following line
   */
  chatbot.goToNextLine = function(nextLine) {
    var l;
    // If nextLine is not specified go to following line
    if (typeof nextLine === 'undefined') {
      l = parseID(this.currentLine.id);
      nextLineId = l.chapter + (l.line + 1);
    }
    // search line by Id and update the object
    this.currentLine = searchLine(this.story, this.lang, nextLine);
    // parse the new line
    this.parseLine(this.currentLine);
    return this;
  };
  /**
   * Function to start the conversation (useful for testing lines)
   * @return {undefined}
   * @param {string} lineId an optional line id
   */
  chatbot.breakTheIce = function(lineId) {
    lineId = (typeof lineId !== 'undefined') ? lineId : this.start;
    this.goToNextLine(lineId);
  };
  /**
   * Function to test if conversation is over
   * @return {boolean} true if conversation has reached last line
   */
  chatbot.isOver = function() {
    return this.currentLine === this.end;
  }
  /**
   * Function to read or update the user object
   * @return {} the property value
   * @param {object} user the user object
   * @param {string} property the property name
   * @param {} value the value to be given, if undefined the property is read
   */
  var userProp = function(user, property, value) {
    if (typeof value !== 'undefined') {
      user[property] = value;
    }
    return user[property];
  };
  /**
   * Function to choose the line text when needed
   * @return {object} the chosen line object
   * @param {object} user the object to check against
   * @param {array} choices an array of possibile lines
   */
  var choose = function(user, choices) {
    var i, prop, val, check;
    for (i=0; i < choices.length; i += 1) {
      prop = choices[i]['prop'];
      val = choices[i]['value'];
      if (user[prop] === value || user['has' + prop] === value) {
        return choices[i];
      }
    }
  };
  /**
   * Function to add a delay between lines according to text length
   * @return {number} the timeout id
   * @param {function} action the function to be called after the delay
   * @param {string} text the text to be used in speed calculations
   * the function also change the thinking css classes accordingly
   */
  var think = function(action, text) {
    var wpm = 180,
        averageLength = 5,
        words = text.length / averageLength,
        bonus = 500,
        wordsTime = words / wpm * 60 * 100 + bonus;

    $('#dr27 .think').addClass('hide');
    return setTimeout(function() {
      $('#dr27 .think').removeClass('hide');
      act();
    }, wordsTime);
  };
  /**
   * Function to parse the given text and replace eventual variables
   * @return {string} the parsed text
   * @param {object} user the user object to get variables from
   * @param {string} text the text to be parsed
   */
  var parseText = function(user, text) {
    var regex = /\B(\#[a-zA-Z]+\b)(?!;)/g,
        match = text.match(regex),
        prop,
        value;
    if (match) {
      prop = match[0].substr(1);
      value = user[prop];
      text = text.replace(match[0], value);
    }
    return text;
  }
  /**
   * Function to add a paragraph to the #conversation
   * @param {string} speaker The speaker CSS class name
   * @param {string} text The text to be appended to the paragraph
   */
  var say = function(speaker, text) {
    text = parseText(text);

    $(document.createElement('p'))
        .addClass(speaker)
        .text(text)
        .appendTo('#conversation');
  };
  /**
   * Function to add a paragraph with an anchor to the #conversation
   * @param {string} speaker The speaker CSS class
   * @param {object} line The object containing the text and attrs
   */
  var anchor = function(speaker, line) {
    var $p = $(document.createElement('p'));
    $(document.createElement('a'))
        .attr('href', line.url)
        .attr('target', '_blank')
        .text(line.text)
        .appentTo($p);
    $p.addClass(speaker).appendTo('#conversation');
  };
  /**
   * Function to add a figure element to the #conversation
   * @param {string} speaker The speaker CSS class
   * @param {object} line The object containing the text and attrs
   */
  var show = function(speaker, line) {
    var $figure = $(document.createElement('figure'));
    $(document.createElement('img'))
        .attr('src', line.src)
        .attr('alt', line.text)
        .appendTo($figure);
    $(document.createElement('figcaptio'))
        .text(text)
        .appendTo($figure);
    $figure.addClass(speaker).appendTo('#conversation');
  };
  /**
   * Function to process user input and store the value if needed
   * @return {object} the chosen line object modified
   * @param {object} user the user object
   * @param {object} line the line object
   */
  var reply = function(user, line) {
    if (line.store && !user['has' + line.store]) {
      user[line.store] = line.value;
    }
    line.type = 'answer';
    $('#user figcaption, #input').addClass('hide');
    parseLine(line);
  };
  /**
   * Function to add buttons or form input to #inputs
   * @param {object} user The user object
   * @param {array} questions The array of choices to display
   */
  var ask = function(user, questions) {
    var i, q, $li, $btn, $input, $label, $form;
    var $parent = $('#input');
    $parent.empty();
    for (i = 0; i < questions.length; i += 1) {
      $li = $(document.createElement('li'));
      q = questions[i];
      switch (q.type) {
        case 'radio': {
          $btn = $(document.createElement('button'));
          $btn.attr('type', 'button')
                .attr('name', 'button')
                .attr('value', q.next)
                .attr('title', q.text)
                .text(q.text)
                .on('click', q, function(e) {
                  reply(user, e.data);
                })
                .appendTo($li);
          break;
        }
        case 'partial' : {
          q.text = choose(user, q.text).text;
          $btn = $(document.createElement('button'));
          $btn.attr('type', 'button')
                .attr('name', 'button')
                .attr('value', q.next)
                .attr('title', q.text)
                .text(q.text)
                .on('click', q, function(e) {
                  reply(user, e.data);
                })
                .appendTo($li);
          break;
        }
        case 'input' : {
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
          $form.appendTo($li)
               .on('submit', q, function(e){
                 e.preventDefault();
                 var check = 'has' + q.store;
                 user[check] = false;
                 if(e.data.text !== '') {
                   e.data.text = (e.target[q.store].value);
                   e.data.text = e.data.text.trim();
                   e.data.text = e.data.text[0].toUpperCase()
                               + e.data.text.substr(1).toLowerCase();
                   user[q.store] = e.data.text;
                   user[check] = (user[q.store] !== '');
                 }
                 reply(user, e.data);
               });
          break;
        }
        default : {
          break;
        }
      } // switch
      $li.appendTo($parent);
    } // for loop
    $parent.removeClass('hide');
    $('#user figcaption').removeClass('hide');
  };
  /**
   *
   */
  var parseLine = function(line) {
    switch (line.type) {
      case "neutral": {
        say('dr27', line.text);
        think(function() {
          goToNextLine();
        }, line.text)
        break;
      }
      case "question": {
        break;
      }
      case "link": {
        break;
      }
      case "figure": {
        break;
      }
      case "partial": {
        break;
      }
      case "answer": {
        break;
      }

    }
  };



  return chatbot;

}(STORYLINE));
