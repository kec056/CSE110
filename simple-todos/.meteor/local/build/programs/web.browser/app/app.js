var require = meteorInstall({"client":{"template.main.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// client/template.main.js                                                                        //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
                                                                                                  // 1
Template.body.addContent((function() {                                                            // 2
  var view = this;                                                                                // 3
  return HTML.Raw('<div id="render-target"></div>');                                              // 4
}));                                                                                              // 5
Meteor.startup(Template.body.renderToDocument);                                                   // 6
                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.jsx":["react","meteor/meteor","react-dom","../imports/startup/accounts-config.js","../imports/ui/App.jsx",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// client/main.jsx                                                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _react = require('react');                                                                    // 1
                                                                                                  //
var _react2 = _interopRequireDefault(_react);                                                     //
                                                                                                  //
var _meteor = require('meteor/meteor');                                                           // 2
                                                                                                  //
var _reactDom = require('react-dom');                                                             // 3
                                                                                                  //
require('../imports/startup/accounts-config.js');                                                 // 5
                                                                                                  //
var _App = require('../imports/ui/App.jsx');                                                      // 6
                                                                                                  //
var _App2 = _interopRequireDefault(_App);                                                         //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
                                                                                                  //
_meteor.Meteor.startup(function () {                                                              // 8
  (0, _reactDom.render)(_react2['default'].createElement(_App2['default'], null), document.getElementById('render-target'));
});                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"imports":{"api":{"tasks.js":["meteor/meteor","meteor/mongo","meteor/check",function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/tasks.js                                                                           //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
exports.__esModule = true;                                                                        //
exports.Tasks = undefined;                                                                        //
                                                                                                  //
var _meteor = require('meteor/meteor');                                                           // 1
                                                                                                  //
var _mongo = require('meteor/mongo');                                                             // 2
                                                                                                  //
var _check = require('meteor/check');                                                             // 3
                                                                                                  //
var Tasks = exports.Tasks = new _mongo.Mongo.Collection('tasks');                                 // 5
                                                                                                  //
if (_meteor.Meteor.isServer) {                                                                    // 7
  // This code only runs on the server                                                            //
  // Only publish tasks that are public or belong to the current user                             //
  _meteor.Meteor.publish('tasks', function () {                                                   // 10
    function tasksPublication() {                                                                 // 10
      return Tasks.find({ owner: this.userId });                                                  // 11
    }                                                                                             //
                                                                                                  //
    return tasksPublication;                                                                      //
  }());                                                                                           //
}                                                                                                 //
                                                                                                  //
_meteor.Meteor.methods({                                                                          // 15
  'tasks.insert': function () {                                                                   // 16
    function tasksInsert(text) {                                                                  //
      (0, _check.check)(text, String);                                                            // 17
                                                                                                  //
      // Make sure the user is logged in before inserting a task                                  //
      if (!this.userId) {                                                                         // 16
        throw new _meteor.Meteor.Error('not-authorized');                                         // 21
      }                                                                                           //
                                                                                                  //
      Tasks.insert({                                                                              // 24
        text: text,                                                                               // 25
        createdAt: new Date(),                                                                    // 26
        owner: this.userId,                                                                       // 27
        username: _meteor.Meteor.users.findOne(this.userId).username                              // 28
      });                                                                                         //
    }                                                                                             //
                                                                                                  //
    return tasksInsert;                                                                           //
  }(),                                                                                            //
  'tasks.remove': function () {                                                                   // 31
    function tasksRemove(taskId) {                                                                //
      (0, _check.check)(taskId, String);                                                          // 32
                                                                                                  //
      var task = Tasks.findOne(taskId);                                                           // 34
      if (task['private'] && task.owner !== this.userId) {                                        // 35
        // If the task is private, make sure only the owner can delete it                         //
        throw new _meteor.Meteor.Error('not-authorized');                                         // 37
      }                                                                                           //
                                                                                                  //
      Tasks.remove(taskId);                                                                       // 40
    }                                                                                             //
                                                                                                  //
    return tasksRemove;                                                                           //
  }(),                                                                                            //
  'tasks.setChecked': function () {                                                               // 42
    function tasksSetChecked(taskId, setChecked) {                                                //
      (0, _check.check)(taskId, String);                                                          // 43
      (0, _check.check)(setChecked, Boolean);                                                     // 44
                                                                                                  //
      var task = Tasks.findOne(taskId);                                                           // 46
      if (task.owner !== this.userId) {                                                           // 47
        // If the task is private, make sure only the owner can check it off                      //
        throw new _meteor.Meteor.Error('not-authorized');                                         // 49
      }                                                                                           //
                                                                                                  //
      Tasks.update(taskId, { $set: { checked: setChecked } });                                    // 52
    }                                                                                             //
                                                                                                  //
    return tasksSetChecked;                                                                       //
  }(),                                                                                            //
  'tasks.edit': function () {                                                                     // 54
    function tasksEdit(taskId, text) {                                                            //
      (0, _check.check)(taskId, String);                                                          // 55
      (0, _check.check)(text, String);                                                            // 56
                                                                                                  //
      var task = Tasks.findOne(taskId);                                                           // 58
      if (task.owner !== this.userId) {                                                           // 59
        throw new _meteor.Meteor.Error('not-authorized');                                         // 60
      }                                                                                           //
                                                                                                  //
      Tasks.update(taskId, { $set: { text: text } });                                             // 63
    }                                                                                             //
                                                                                                  //
    return tasksEdit;                                                                             //
  }()                                                                                             //
});                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"startup":{"accounts-config.js":["meteor/accounts-base",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/startup/accounts-config.js                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _accountsBase = require('meteor/accounts-base');                                              // 1
                                                                                                  //
_accountsBase.Accounts.ui.config({                                                                // 3
  passwordSignupFields: 'USERNAME_ONLY'                                                           // 4
});                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"ui":{"AccountsUIWrapper.jsx":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-dom","meteor/templating","meteor/blaze",function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/AccountsUIWrapper.jsx                                                               //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
exports.__esModule = true;                                                                        //
                                                                                                  //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require('babel-runtime/helpers/inherits');                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
var _react = require('react');                                                                    // 1
                                                                                                  //
var _react2 = _interopRequireDefault(_react);                                                     //
                                                                                                  //
var _reactDom = require('react-dom');                                                             // 2
                                                                                                  //
var _reactDom2 = _interopRequireDefault(_reactDom);                                               //
                                                                                                  //
var _templating = require('meteor/templating');                                                   // 3
                                                                                                  //
var _blaze = require('meteor/blaze');                                                             // 4
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
                                                                                                  //
var AccountsUIWrapper = function (_Component) {                                                   //
  (0, _inherits3['default'])(AccountsUIWrapper, _Component);                                      //
                                                                                                  //
  function AccountsUIWrapper() {                                                                  //
    (0, _classCallCheck3['default'])(this, AccountsUIWrapper);                                    //
    return (0, _possibleConstructorReturn3['default'])(this, _Component.apply(this, arguments));  //
  }                                                                                               //
                                                                                                  //
  AccountsUIWrapper.prototype.componentDidMount = function () {                                   //
    function componentDidMount() {                                                                //
      // Use Meteor Blaze to render login buttons                                                 //
      this.view = _blaze.Blaze.render(_templating.Template.loginButtons, _reactDom2['default'].findDOMNode(this.refs.container));
    }                                                                                             //
                                                                                                  //
    return componentDidMount;                                                                     //
  }();                                                                                            //
                                                                                                  //
  AccountsUIWrapper.prototype.componentWillUnmount = function () {                                // 6
    function componentWillUnmount() {                                                             //
      // Clean up Blaze view                                                                      //
      _blaze.Blaze.remove(this.view);                                                             // 14
    }                                                                                             //
                                                                                                  //
    return componentWillUnmount;                                                                  //
  }();                                                                                            //
                                                                                                  //
  AccountsUIWrapper.prototype.render = function () {                                              // 6
    function render() {                                                                           //
      // Just render a placeholder container that will be filled in                               //
      return _react2['default'].createElement('span', { ref: 'container' });                      // 18
    }                                                                                             //
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return AccountsUIWrapper;                                                                       //
}(_react.Component);                                                                              //
                                                                                                  //
exports['default'] = AccountsUIWrapper;                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////

}],"App.jsx":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-dom","meteor/react-meteor-data","../api/tasks.js","./Task.jsx","./AccountsUIWrapper.jsx",function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/App.jsx                                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
exports.__esModule = true;                                                                        //
                                                                                                  //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require('babel-runtime/helpers/inherits');                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
var _react = require('react');                                                                    // 1
                                                                                                  //
var _react2 = _interopRequireDefault(_react);                                                     //
                                                                                                  //
var _reactDom = require('react-dom');                                                             // 2
                                                                                                  //
var _reactDom2 = _interopRequireDefault(_reactDom);                                               //
                                                                                                  //
var _reactMeteorData = require('meteor/react-meteor-data');                                       // 3
                                                                                                  //
var _tasks = require('../api/tasks.js');                                                          // 5
                                                                                                  //
var _Task = require('./Task.jsx');                                                                // 7
                                                                                                  //
var _Task2 = _interopRequireDefault(_Task);                                                       //
                                                                                                  //
var _AccountsUIWrapper = require('./AccountsUIWrapper.jsx');                                      // 8
                                                                                                  //
var _AccountsUIWrapper2 = _interopRequireDefault(_AccountsUIWrapper);                             //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
                                                                                                  //
// App component - represents the whole app                                                       //
                                                                                                  //
var App = function (_Component) {                                                                 //
  (0, _inherits3['default'])(App, _Component);                                                    //
                                                                                                  //
  function App(props) {                                                                           // 12
    (0, _classCallCheck3['default'])(this, App);                                                  //
                                                                                                  //
    var _this = (0, _possibleConstructorReturn3['default'])(this, _Component.call(this, props));  //
                                                                                                  //
    _this.state = {                                                                               // 15
      hideCompleted: false                                                                        // 16
    };                                                                                            //
    return _this;                                                                                 //
  }                                                                                               //
                                                                                                  //
  App.prototype.handleSubmit = function () {                                                      // 11
    function handleSubmit(event) {                                                                //
      event.preventDefault();                                                                     // 21
                                                                                                  //
      // Find the text field via the React ref                                                    //
      var text = _reactDom2['default'].findDOMNode(this.refs.textInput).value.trim();             // 20
                                                                                                  //
      Meteor.call('tasks.insert', text);                                                          // 26
                                                                                                  //
      // Clear form                                                                               //
      _reactDom2['default'].findDOMNode(this.refs.textInput).value = '';                          // 20
    }                                                                                             //
                                                                                                  //
    return handleSubmit;                                                                          //
  }();                                                                                            //
                                                                                                  //
  App.prototype.toggleHideCompleted = function () {                                               // 11
    function toggleHideCompleted() {                                                              //
      this.setState({                                                                             // 33
        hideCompleted: !this.state.hideCompleted                                                  // 34
      });                                                                                         //
    }                                                                                             //
                                                                                                  //
    return toggleHideCompleted;                                                                   //
  }();                                                                                            //
                                                                                                  //
  App.prototype.renderTasks = function () {                                                       // 11
    function renderTasks() {                                                                      //
      var _this2 = this;                                                                          //
                                                                                                  //
      var filteredTasks = this.props.tasks;                                                       // 39
      if (this.state.hideCompleted) {                                                             // 40
        filteredTasks = filteredTasks.filter(function (task) {                                    // 41
          return !task.checked;                                                                   //
        });                                                                                       //
      }                                                                                           //
      /*                                                                                          //
      return filteredTasks.map((task) => (                                                        //
        <Task key={task._id} task={task} />                                                       //
      ));                                                                                         //
      */                                                                                          //
      if (this.props.currentUser) {                                                               // 38
        return filteredTasks.map(function (task) {                                                // 49
          var currentUserId = _this2.props.currentUser && _this2.props.currentUser._id;           // 50
                                                                                                  //
          if (task.owner == currentUserId) {                                                      // 52
            return _react2['default'].createElement(_Task2['default'], {                          // 53
              key: task._id,                                                                      // 55
              task: task                                                                          // 56
            });                                                                                   //
          }                                                                                       //
        });                                                                                       //
      }                                                                                           //
    }                                                                                             //
                                                                                                  //
    return renderTasks;                                                                           //
  }();                                                                                            //
                                                                                                  //
  App.prototype.render = function () {                                                            // 11
    function render() {                                                                           //
      return _react2['default'].createElement(                                                    // 65
        'div',                                                                                    //
        { className: 'container' },                                                               //
        _react2['default'].createElement(                                                         //
          'header',                                                                               //
          null,                                                                                   //
          _react2['default'].createElement(                                                       //
            'h1',                                                                                 //
            null,                                                                                 //
            'Todo List (',                                                                        //
            this.props.incompleteCount,                                                           //
            ')'                                                                                   //
          ),                                                                                      //
          _react2['default'].createElement(                                                       //
            'label',                                                                              //
            { className: 'hide-completed' },                                                      //
            _react2['default'].createElement('input', {                                           //
              type: 'checkbox',                                                                   // 72
              readOnly: true,                                                                     // 73
              checked: this.state.hideCompleted,                                                  // 74
              onClick: this.toggleHideCompleted.bind(this)                                        // 75
            }),                                                                                   //
            'Hide Completed Tasks'                                                                //
          ),                                                                                      //
          _react2['default'].createElement(_AccountsUIWrapper2['default'], null),                 //
          this.props.currentUser ? _react2['default'].createElement(                              //
            'form',                                                                               //
            { className: 'new-task', onSubmit: this.handleSubmit.bind(this) },                    //
            _react2['default'].createElement('input', {                                           //
              type: 'text',                                                                       // 85
              ref: 'textInput',                                                                   // 86
              placeholder: 'Type to add new tasks'                                                // 87
            })                                                                                    //
          ) : ''                                                                                  //
        ),                                                                                        //
        _react2['default'].createElement(                                                         //
          'ul',                                                                                   //
          null,                                                                                   //
          this.props.currentUser ? this.renderTasks() : ''                                        //
        )                                                                                         //
      );                                                                                          //
    }                                                                                             //
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return App;                                                                                     //
}(_react.Component);                                                                              //
                                                                                                  //
App.propTypes = {                                                                                 // 103
  tasks: _react.PropTypes.array.isRequired,                                                       // 104
  incompleteCount: _react.PropTypes.number.isRequired,                                            // 105
  currentUser: _react.PropTypes.object                                                            // 106
};                                                                                                //
                                                                                                  //
exports['default'] = (0, _reactMeteorData.createContainer)(function () {                          //
  Meteor.subscribe('tasks');                                                                      // 110
                                                                                                  //
  return {                                                                                        // 112
    tasks: _tasks.Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),                            // 113
    incompleteCount: _tasks.Tasks.find({ username: Meteor.user() ? Meteor.user().username : null, checked: { $ne: true } }).count(),
    currentUser: Meteor.user()                                                                    // 115
  };                                                                                              //
}, App);                                                                                          //
////////////////////////////////////////////////////////////////////////////////////////////////////

}],"Task.jsx":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-dom","meteor/meteor",function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/Task.jsx                                                                            //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
exports.__esModule = true;                                                                        //
                                                                                                  //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require('babel-runtime/helpers/inherits');                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
var _react = require('react');                                                                    // 1
                                                                                                  //
var _react2 = _interopRequireDefault(_react);                                                     //
                                                                                                  //
var _reactDom = require('react-dom');                                                             // 2
                                                                                                  //
var _reactDom2 = _interopRequireDefault(_reactDom);                                               //
                                                                                                  //
var _meteor = require('meteor/meteor');                                                           // 3
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
                                                                                                  //
// Task component - represents a single todo item                                                 //
                                                                                                  //
var Task = function (_Component) {                                                                //
  (0, _inherits3['default'])(Task, _Component);                                                   //
                                                                                                  //
  function Task(props) {                                                                          // 7
    (0, _classCallCheck3['default'])(this, Task);                                                 //
                                                                                                  //
    var _this = (0, _possibleConstructorReturn3['default'])(this, _Component.call(this, props));  //
                                                                                                  //
    _this.state = {                                                                               // 10
      editTask: false                                                                             // 11
    };                                                                                            //
    return _this;                                                                                 //
  }                                                                                               //
                                                                                                  //
  Task.prototype.toggleChecked = function () {                                                    // 6
    function toggleChecked() {                                                                    //
      // Set the checked property to the opposite of its current value                            //
      _meteor.Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);     // 17
    }                                                                                             //
                                                                                                  //
    return toggleChecked;                                                                         //
  }();                                                                                            //
                                                                                                  //
  Task.prototype.setEdit = function () {                                                          // 6
    function setEdit() {                                                                          //
      this.setState({                                                                             // 21
        editTask: true                                                                            // 22
      });                                                                                         //
    }                                                                                             //
                                                                                                  //
    return setEdit;                                                                               //
  }();                                                                                            //
                                                                                                  //
  Task.prototype.deleteThisTask = function () {                                                   // 6
    function deleteThisTask() {                                                                   //
      _meteor.Meteor.call('tasks.remove', this.props.task._id);                                   // 27
    }                                                                                             //
                                                                                                  //
    return deleteThisTask;                                                                        //
  }();                                                                                            //
                                                                                                  //
  Task.prototype.editThisTask = function () {                                                     // 6
    function editThisTask(event) {                                                                //
      this.setState({                                                                             // 31
        editTask: false                                                                           // 32
      });                                                                                         //
                                                                                                  //
      event.preventDefault();                                                                     // 35
                                                                                                  //
      var text = _reactDom2['default'].findDOMNode(this.refs.editInput).value.trim();             // 37
                                                                                                  //
      _meteor.Meteor.call('tasks.edit', this.props.task._id, text);                               // 39
    }                                                                                             //
                                                                                                  //
    return editThisTask;                                                                          //
  }();                                                                                            //
                                                                                                  //
  Task.prototype.handleFocus = function () {                                                      // 6
    function handleFocus() {                                                                      //
      this.refs.editInput.focus();                                                                // 44
    }                                                                                             //
                                                                                                  //
    return handleFocus;                                                                           //
  }();                                                                                            //
                                                                                                  //
  Task.prototype.render = function () {                                                           // 6
    function render() {                                                                           //
      // Give tasks a different className when they are checked off,                              //
      // so that we can style them nicely in CSS                                                  //
      var taskClassName = this.props.task.checked ? 'checked' : '';                               // 50
                                                                                                  //
      return _react2['default'].createElement(                                                    // 52
        'li',                                                                                     //
        { className: taskClassName },                                                             //
        !this.state.editTask ? _react2['default'].createElement(                                  //
          'button',                                                                               //
          { className: 'delete', onClick: this.deleteThisTask.bind(this) },                       //
          '×'                                                                                     //
        ) : '',                                                                                   //
        !this.state.editTask ? _react2['default'].createElement(                                  //
          'button',                                                                               //
          { className: 'edit', onClick: this.setEdit.bind(this) },                                //
          'Edit'                                                                                  //
        ) : _react2['default'].createElement(                                                     //
          'form',                                                                                 //
          { className: 'text', onSubmit: this.editThisTask.bind(this) },                          //
          _react2['default'].createElement('input', {                                             //
            type: 'text',                                                                         // 67
            autoFocus: true,                                                                      // 68
            ref: 'editInput',                                                                     // 69
            defaultValue: this.props.task.text,                                                   // 70
            onfocus: this.handleFocus                                                             // 71
          })                                                                                      //
        ),                                                                                        //
        !this.state.editTask ? _react2['default'].createElement('input', {                        //
          type: 'checkbox',                                                                       // 78
          readOnly: true,                                                                         // 79
          checked: this.props.task.checked,                                                       // 80
          onClick: this.toggleChecked.bind(this)                                                  // 81
        }) : '',                                                                                  //
        !this.state.editTask ? _react2['default'].createElement(                                  //
          'span',                                                                                 //
          { className: 'text' },                                                                  //
          this.props.task.text                                                                    //
        ) : ''                                                                                    //
      );                                                                                          //
    }                                                                                             //
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return Task;                                                                                    //
}(_react.Component);                                                                              //
                                                                                                  //
exports['default'] = Task;                                                                        //
                                                                                                  //
                                                                                                  //
Task.propTypes = {                                                                                // 97
  // This component gets the task to display through a React prop.                                //
  // We can use propTypes to indicate it is required                                              //
  task: _react.PropTypes.object.isRequired                                                        // 100
};                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}},{"extensions":[".js",".json",".html",".jsx",".css"]});
require("./client/template.main.js");
require("./client/main.jsx");