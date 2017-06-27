  var el = {
      $cell: true, // Magic flag to make this an app
      style: "font-family: Helvetica; font-size: 14px;",
      $components: [
          {
              $type: "label",
              $text: "Label:",
              class: "red",
              onclick: function(e) { console.log("Label clicked", e) },
              _class: "black" // self defined attribute, won't affect dom
          },
          {
              $type: "input",
              type: "text",
              placeholder: "Type something and press enter",
              style: "width: 100%; outline:none; padding: 5px;",
              $init: function (e) { // Life cycle
                  this.focus()
              },
              onkeyup: function (e) { // Dom event handling
                  if (e.keyCode === 13) {
                      document.querySelector("#list")._add(this.value);
                      this.value = "";
                  }
              }
          },
          {
              $type: "ol",
              id: "list",
              _items: [],
              $components: [],
              _add: function (val) { // private method
                  this._items.push(val)
              },
              _remove: function(val) {
                    this._items = this._items.filter(item => {
                        return item !== val;
                    });
              },
              $update: function () { // Life cycle
                  this.$components = this._items.map(itemMapper)
              }
          }
      ]
  }

// an mapper to produce child components
function itemMapper(item) {
    return {
        $type: "li",
        class: "todo-item",
        $components: [{
                $text: item,
                $type: "span"
            },
            {
                $html: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>`,
                $type: "a",
                href: "#",
                _item: item,
                onclick: function (e) {
                    document.querySelector("#list")._remove(this._item);
                }
            }
        ]
    }
}
