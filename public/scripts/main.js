// console.log( $('li') )
// console.log( $('[class|=col]') )
// console.log( $('.list-group > .list-group-item') )
// console.log( $('.list-group').children('.list-group-item') )
// console.log( $('.list-group > .list-group-item:nth-child(1)') )
// console.log( $('[id]') )

// const $li = $('.list-group-item').eq(2)
// // const $heading = $li.parent().prev()
// const $heading = $li.closest('.panel').find('.panel-heading')
// const text = $heading.contents().filter(function() {
//   return this.nodeType === Node.TEXT_NODE;
// }).text().trim()
// console.log( text )

const $panels = $('.panel')
$panels.each(function () {
  const $panel = $(this)
  const db = $panel.find('.list-group-item').length
  $panel.find('.panel-heading span').before(`(${db})`) 
})

$headings = $('.panel-heading')
// $headings.next().hide()
$headings.on('click', function (e) {
  // console.log(this)
  const $ul = $(this).next()
  $ul.slideToggle()
})