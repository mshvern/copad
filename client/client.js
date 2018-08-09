import Materialize from 'materialize-css'
global.M = global.Materialize = Materialize
// Define global editor so we don't have to address ShareJS API
var codeEditor = null
var currentlyEvaluating = false

Template.docList.helpers({
  documents: function () {
    return Documents.find()
  }
})

Template.docList.events = {
  'click .newcode': function () {
    return Documents.insert({
      title: 'New Codespace'
    }, function (err, id) {
      if (!id) {
        return
      }
      if (err) {
        console.log(err)
      }
      return Session.set('document', id)
    })
  }
}

Template.docItem.helpers({
  current: function () {
    return Session.equals('document', this._id)
  }
})

Template.docItem.events = {
  'click a': function (e) {
    e.preventDefault()
    return Session.set('document', this._id)
  },
  'click .deletecode': function (e) {
    e.preventDefault()
    Session.set('document', undefined)
    return Documents.remove(this._id)
  }
}

Template.docTitle.helpers({
  title: function () {
    var ref
    return (ref = Documents.findOne(this + '')) != null ? ref.title : void 0
  }
})

Template.editor.helpers({
  docid: function () {
    return Session.get('document')
  }
})

Template.editor.events = {
  'keydown input[name=title]': function (e) {
    var id
    if (e.keyCode !== 13) {
      return
    }
    e.preventDefault()
    $(e.target).blur()
    id = Session.get('document')
    return Documents.update(id, {
      title: e.target.value
    })
  },
  'click #execute': function (e) {
    if (currentlyEvaluating) { return }
    currentlyEvaluating = true
    let frame = document.querySelector('#outputFrame')
    let frameDocument = frame.contentDocument
    if (frameDocument.body.childNodes) {
      for (let i of Array.from(frameDocument.body.childNodes)) {
        i.remove()
      }
    }
    let script = frameDocument.createElement('script')
    let outputElement = frameDocument.createElement('div')
    outputElement.id = 'outputDiv'
    if (document.querySelector('#langSelect').value.toLowerCase() === 'javascript') {
      script.innerHTML = `setTimeout(() => {
        (function executeCodeFromInneriFrame () {
          try {
            let outputDiv = document.querySelector('#outputDiv')
            outputDiv.innerHTML = ''
            let startTime = Date.now()
            console.log = function (message) {
              let executionTime = Date.now() - startTime
              outputDiv.innerHTML = '<p>(' + executionTime + ' ms): ' + message + '</p>' + outputDiv.innerHTML
            }
            console.error = console.debug = console.info = console.log
            ` + codeEditor.getValue() + `
          } catch (error) {
            console.error(error)
          }
        })()
      }, 0)`
    } else if (document.querySelector('#langSelect').value.toLowerCase() === 'python') {
      script.type = 'text/python3'
      script.innerHTML = `\n
from browser import document
document['outputDiv'].innerHTML = ''
def new_print(args):
  document['outputDiv'].innerHTML = '<p>(log): ' + args + '</p>' + document['outputDiv'].innerHTML

print = new_print \n` + codeEditor.getValue()
      // <script type="text/javascript" src="https://cdn.rawgit.com/brython-dev/brython/3.6.2/www/src/brython.js">
      let dependency = frameDocument.createElement('script')
      dependency.type = 'text/javascript'
      dependency.src = 'https://cdn.rawgit.com/brython-dev/brython/3.6.2/www/src/brython.js'
      let executor = frameDocument.createElement('script')
      executor.innerHTML = `setTimeout(()=>{brython()}, 1)`
      frameDocument.body.appendChild(dependency)
      frameDocument.body.appendChild(executor)
    }

    frameDocument.body.appendChild(outputElement)
    frameDocument.body.appendChild(script)
    let outputDiv = document.querySelector('#outputDiv')
    // outputDiv.innerHTML = '<p class="red">Evaluating...</p>'
    setTimeout(() => {
      // outputDiv.innerHTML = ''
      if (!Outputs.findOne()) {
        Outputs.insert({content: outputElement.innerHTML})
      } else {
        Outputs.update(Outputs.findOne()._id, {content: outputElement.innerHTML})
      }

      currentlyEvaluating = false
    }, 0)
  },
  'click #clear': function (e) {
    document.querySelector('#outputDiv').innerHTML = ''
  }

}

Template.editor.helpers({
  configCM: function () {
    return function (cm) {
      codeEditor = cm
      cm.setOption('theme', 'default')
      cm.setOption('lineNumbers', true)
      cm.setOption('lineWrapping', true)
      cm.setOption('smartIndent', true)
      cm.setOption('mode', document.querySelector('#langSelect').value.toLowerCase())
      cm.setOption('theme', 'monokai')
      return cm.setOption('indentWithTabs', true)
    }
  },
  output () {
    return Outputs.findOne() ? Outputs.findOne().content : 'this is wrong'
  }
})

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select')
  var instances = M.FormSelect.init(elems)
  document.querySelector('#langSelect').addEventListener('change', () => {
    if (codeEditor) {
      codeEditor.setOption('mode', document.querySelector('#langSelect').value.toLowerCase())
    }
  })
})
