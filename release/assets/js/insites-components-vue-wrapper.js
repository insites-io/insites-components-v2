var templateBuilder = function(componentKey, eventsList) {

  var convertToSnakeCase = function(camelCasedString) {
    return camelCasedString.replace(/[\w]([A-Z])/g, function(m) { return m[0] + "_" + m[1]; }).toLowerCase()
  }

  var convertToEventString = function(snakeCasedString) {
    return snakeCasedString.split('_').filter(function(token){ return ['on','ins'].indexOf(token) == -1 }).join('-')
  }

  var eventPairs = eventsList.map(function(camelCasedEventString){
    return [camelCasedEventString, convertToEventString(convertToSnakeCase(camelCasedEventString))];
  });

  var eventPairsString = eventPairs.map(function([camelCasedEventString, kebabCasedEventString]) {
    if (camelCasedEventString === "valueChange"){
      return `@${ camelCasedEventString }="inputHandler"`
    }
    return `@${ camelCasedEventString }="$emit('${ kebabCasedEventString }', $event);"`
  }).join(' ');
  return `<ins-${ componentKey } v-bind="$props" ${ eventPairsString }><slot /></ins-${ componentKey }>`;
}

var componentDetailsMapping = {
  'button':           ['onClickInsButton', 'onClickInsButtonOption'],
  'checkbox-card':    ['onClickInsCheckboxCard', 'valueChange'],
  'checkbox':         ['onCheckInsCheckbox', 'valueChange'],
  'code-editor':      ['valueChange'],
  'credit-card':      ['insCreditCardClicked', 'insCreditCardClosed'],
  'date-time':        ['onpick', 'valueChange'],
  'datepicker':       ['onDateChange', 'valueChange'],
  'drawer':           ['toggleDrawer'],
  'editor':           ['valueChange'],
  'filter':           ['onFilterApply'],
  'heading':          ['onInsHeadingUpdate'],
  'image-picker':     ['valueChange'],
  'input-file':       ['fileAdded', 'fileRemoved', 'fileError'],
  'input-tel':        ['insInputTelChange', 'valueChange'],
  'input':            ['oninput', 'onblur', 'valueChange'],
  'markdown-editor':  ['valueChange'],
  'radio':            ['onSelect', 'valueChange'],
  'select-option':    ['insSelectOptionClicked', 'defaultEvent'],
  'select':           ['onOptionSelect', 'onSubmitOption', 'valueChange'],
  'sort':             ['onDragStart', 'onDragEnd', 'onChoose', 'onAdd', 'onUpdate', 'onMove', 'onRemoved', 'onCloned', 'onPositionChanged'],
  'tab-item':         ['tabItemError'],
  'tab':              ['onchangeTab'],
  'textarea':         ['oninput', 'valueChange'],
  'timeline':         ['paginationChange'],
  'timepicker':       ['onblur', 'oninput', 'valueChange'],
  'toggle-switch':    ['onCheckInsToggleSwitch', 'valueChange'],
  'modal':            ['onInsModalClose'],
  'slider':           ['slide'],
  'accordion':        ['toggle'],
  'accordion-item':   [],
  'accordion-link':   [],
  'admin':            [],
  'backdrop':         [],
  'card':             [],
  'content':          [],
  'header-user':      [],
  'header':           [],
  'info-table':       [],
  'instances-item':   [],
  'instances':        [],
  'loader':           [],
  'markdown':         [],
  'renderer':         [],
  'sidebar-item':     [],
  'sidebar':          [],
  'sparkline':        [],
  'tag':              [],
  'thumbnail':        [],
  'timeline-item':    [],
  'tooltip':          [],
}

for (var key in componentDetailsMapping) {
  var eventsList = componentDetailsMapping[key];
  Vue.component(`insites-${ key }`, {
    template: templateBuilder(key, eventsList),
    methods:{
      inputHandler(event){
        this.$emit('input', event.detail)
      }
    }
  });
  Vue.config.ignoredElements.push(`ins-${ key }`)
}
