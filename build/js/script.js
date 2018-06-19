$(document).ready(function(){
  $('.multiple-items').slick({
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: true,
    infinite: true,
    // dots: true,
    // draggable: false,
    prevArrow: '<img src="img/arrow-left.png" alt="" class="arrow-left">',
    nextArrow: '<img src="img/arrow-right.png" alt="" class="arrow-right">',
    responsive: [
      {breakpoint: 980,
        settings: {
          slidesToShow: 2,
          swipeToSlide: true
        }
      },

      {breakpoint: 650,
        settings: {
          slidesToShow: 1,
          swipeToSlide: true
        }
      }

    ]
  })
});

$(document).ready(function(){
  $('.slick-slider-2').slick({
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: true,
    infinite: true,
    // draggable: false,
    prevArrow: '<img src="img/arrow-left.png" alt="" class="arrow-left2">',
    nextArrow: '<img src="img/arrow-right.png" alt="" class="arrow-right2">'
  });



// Ресайз поля комментариев
  var textarea = $('#comment');
  var textarea2 = $('#comment2');


  textarea.height(textarea.get(0).scrollHeight);
  textarea2.height(textarea.get(0).scrollHeight);

  textarea.on('keyup input', function(){
    var $this = $(this);
    $this.height(1);
    $this.height(this.scrollHeight);
  });

  textarea2.on('keyup input', function(){
    var $this = $(this);
    $this.height(1);
    $this.height(this.scrollHeight);
  });

});

// Количество товара в карточке товара

$(document).ready(function(){
  $('.minus').click(function(){
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    // return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    // return false;
  });
});




// Корзина

$(document).ready(function() {

  // Получаем данные из LocalStorage
  function getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

// Записываем данные в LocalStorage
  function setCart(o) {
    localStorage.setItem('cart', JSON.stringify(o));
    return false;
  }

// добавить товар в корзину
  $('.add-to-cart').click(function () {
    this.disabled = true; // блокируем кнопку на время операции с корзиной
    var cart = getCart() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
      product = $(this).attr('name'),
      amount = parseInt($(this).parent().find('.amount').find('input').val()),
      price = parseInt($(this).parent().find('.card_price').html()),
      cost = amount * price;

    if (cart.hasOwnProperty(product)) { // если такой товар уже в корзине, то добавляем к его количеству
      cart[product][0] += amount;
      cart[product][2] += cost
    } else { // если товара в корзине еще нет, то добавляем в объект
      cart[product] = [amount, price, cost];
    }

    if (!setCart(cart)) { // Обновляем данные в LocalStorage
      this.disabled = false; // разблокируем кнопку после обновления LS
    }
  });

//////////////////////////////////////////////////////////////////////

// div обертка для корзины
  var cartContent = $('#cartContent');



  function arraySum(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum
  }


  function openCart() {
    var cart = getCart();

    // посчитать сумму
    var allCost = [];
    for (var key in cart) {
      allCost[allCost.length] = cart[key][2];
    }

    var totalCost = arraySum(allCost);

    // вывести табличку
    if (cart !== null) {
      var total = '<table id="cartTable">';
      total += '<tr><th>Наименование</th> <th>Количество</th> <th>Цена</th></tr>';
      for (var key in cart) {
        total += '<tr class="cartProduct">';
        total += '<td class="cartProductName">' + key + '</td>';
        total += '<td><span class="cart-minus">-</span><span class="spanAmount">' + cart[key][0] + '</span><span class="cart-plus">+</span></td>';
        total += '<td>' + cart[key][1] + '</td>';
        total += '</tr>';
      }

      var shippingRadio = $('input:checked[name=shipping]');
      var shippingCost = parseInt(shippingRadio.data('shipping'));

      total += '<tr><td>Доставка:</td><td></td><td><span class="shippingCost">' + shippingCost + '</span></td></tr>';
      // total += '<hr>';
      total += '<tr class="totalCostRow"><td>Общая сумма:</td><td></td><td><span class="totalCost">' + totalCost + '</span></td></tr>';
      total += '</table>';
    } else {
      cartContent.html('В корзине пусто!');
    }
    cartContent.html(total);
  }


//   /* Открыть корзину */
  $('.openCart').click(function () {
    openCart()
  });

//* Удаление из корзины */



  //
  //
  //     // var itemId = e.target.getAttribute('data-id'),
  //     //   cartData = getCartData();
  //     // if(cartData.hasOwnProperty(itemId)){
  //     //   var tr = closest(e.target, 'tr');
  //     //   tr.parentNode.removeChild(tr); /* Удаляем строку товара из таблицы */
  //     //   // пересчитываем общую сумму и цену
  //     //   var totalSumOutput = d.getElementById('total_sum'),
  //     //     totalCountOutput = d.getElementById('total_count');
  //     //   totalSumOutput.textContent = +totalSumOutput.textContent - cartData[itemId][1] * cartData[itemId][2];
  //     //   totalCountOutput.textContent = +totalCountOutput.textContent - cartData[itemId][2];
  //     //   delete cartData[itemId]; // удаляем товар из объекта
  //     //   setCartData(cartData); // перезаписываем измененные данные в localStorage
  //     }
  //   }, false);



// товар - +
  $(document).on('click','.cart-minus',function(e){

    this.disabled = true;
    var cart = getCart();

    var spanAmount = $(this).parent().find('.spanAmount');
    var amount = parseInt(spanAmount.html()) - 1;
    amount = amount < 0 ? 0 : amount;
    spanAmount.html(amount);


    var parentTr = $(this).parents('.cartProduct');
    var product = parentTr.find('.cartProductName').html();
    cart[product][0] = amount; // количество
    cart[product][2] = amount * cart[product][1]; // общая стоимость этого вида товара

    // посчитать общую сумму
    var allCost = [];
    for (var key in cart) {
      allCost[allCost.length] = cart[key][2];
    }
    var totalCost = arraySum(allCost);

    // заменить html общей суммы в корзине
    var table = $(this).parents('#cartTable');
    var spanTotalCost = table.find('.totalCost');

    var shippingCost = parseInt($('input:checked[name=shipping]').data('shipping'));

    spanTotalCost.html(totalCost + shippingCost);

    setCart(cart);
    this.disabled = false;

  });

  $(document).on('click','.cart-plus',function(e){

    this.disabled = true;
    var cart = getCart();

    var spanAmount = $(this).parent().find('.spanAmount');
    var amount = parseInt(spanAmount.html()) + 1;
    amount = amount > 99 ? 99 : amount;
    spanAmount.html(amount);


    var parentTr = $(this).parents('.cartProduct');
    var product = parentTr.find('.cartProductName').html();
    cart[product][0] = amount; // количество
    cart[product][2] = amount * cart[product][1]; // общая стоимость этого вида товара

    // посчитать общую сумму
    var allCost = [];
    for (var key in cart) {
      allCost[allCost.length] = cart[key][2];
    }
    var totalCost = arraySum(allCost);

    // заменить html общей суммы в корзине
    var table = $(this).parents('#cartTable');
    var spanTotalCost = table.find('.totalCost');

    var shippingCost = parseInt($('input:checked[name=shipping]').data('shipping'));
    spanTotalCost.html(totalCost + shippingCost);

    setCart(cart);
    this.disabled = false;

  });

  //
  // // добавить товар в корзину
  // $('.add-to-cart').click(function () {
  //   this.disabled = true; // блокируем кнопку на время операции с корзиной
  //   var cart = getCart() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
  //     product = $(this).attr('name'),
  //     amount = parseInt($(this).parent().find('.amount').find('input').val()),
  //     price = parseInt($(this).parent().find('.card_price').html()),
  //     cost = amount * price;
  //
  //   if (cart.hasOwnProperty(product)) { // если такой товар уже в корзине, то добавляем к его количеству
  //     cart[product][0] += amount;
  //     cart[product][2] += cost
  //   } else { // если товара в корзине еще нет, то добавляем в объект
  //     cart[product] = [amount, price, cost];
  //   }
  //
  //   if (!setCart(cart)) { // Обновляем данные в LocalStorage
  //     this.disabled = false; // разблокируем кнопку после обновления LS
  //   }
  // });



// значение выбора доставки для передачи в ajax
//   $('input[name=shipping]').change(function() {
//     var shippingValue = $('input[name=shipping]:checked').val();
//   });

  // var shippingValue = $('input[name=shipping]').val();








//   /* Очистить корзину */
  $('#clear-cart').click(function() {
    localStorage.removeItem('cart');
    $('#cartContent').html('Корзина очишена.');
  });


  // Отправка корзины

  // менять общую сумму при изменении выбора доставки
  $('input[name=shipping]').click(function () {
    var $this = $(this);
    var shipPrice = parseInt($this.data('shipping'));
    var spanTotalCost = $('.totalCost');

    var cartt = getCart();

    var allCostt = [];
    for (var key in cartt) {
      allCostt[allCostt.length] = cartt[key][2];
    }

    var totalCost = arraySum(allCostt);

    var spanShipping = $('.shippingCost');

    spanShipping.html(shipPrice);
    spanTotalCost.html(totalCost + shipPrice);
  });





  $(function(){
    $('#my_form').on('submit', function(e){
      e.preventDefault();

      var cartt = getCart();
      var allCostt = [];
      for (var key in cartt) {
        allCostt[allCostt.length] = cartt[key][2];
      }

      var shippingRadio = $('input:checked[name=shipping]');
      var shipping = shippingRadio.val();

      var shipCost = parseInt(shippingRadio.data('shipping'));

      var totalCostt = arraySum(allCostt) + shipCost;


      var name = $("#name").val();
      var phone = $("#phone").val();
      var email = $("#email").val();
      var adress = $("#adress").val();
      var comment = $("#comment").val();

      var total = '<table>';
      total += '<tr><th>Наименование</th> <th>Количество</th> <th>Цена</th></tr>';
      for (var key in cartt) {
        total += '<tr>';
        total += '<td>' + key + '</td>' + '<td>' + cartt[key][0] + '</td>' + '<td>' + cartt[key][1] + '</td>';
        total += '</tr>';
      }
      total += '<tr><td>Доставка:</td><td></td><td><span class="shippingCost">' + shipCost + '</span></td></tr>';
      total += '<tr><td>Общая сумма:</td><td></td><td>' + totalCostt + '</td></tr>';
      total += '</table>';


      // var shippingValue;
      // $('input[name=shipping]').each(function(){
      //   if($(this).is(':checked')){
      //     shippingValue = $(this).val();
      //   }
      // });


      var $that = $(this);
      $.ajax({
        url: $that.attr('action'), // путь к обработчику берем из атрибута action
        type: $that.attr('method'), // метод передачи - берем из атрибута method
        data: {name: name, phone: phone, email: email, adress: adress, comment: comment, shipping: shipping, total: total},
        dataType: 'html',
        success: function(json){
          // В случае успешного завершения запроса...
          if(json){
            $that.replaceWith(json); // заменим форму данными, полученными в ответе.
          }
        }
      });
    });
  });

  $(function(){
    $('#form2').on('submit', function(e){
      e.preventDefault();

      cartt = getCart();
      var allCostt = [];
      for (var key in cartt) {
        allCostt[allCostt.length] = cartt[key][2];
      }

      function arraySum(array) {
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
          sum += array[i];
        }
        return sum
      }

      var totalCostt = arraySum(allCostt);

      var name = $("#name2").val();
      var phone = $("#phone2").val();
      var email = $("#email2").val();
      var comment = $("#comment2").val();

      var total = '<table>';
      total += '<tr><th>Наименование</th> <th>Количество</th> <th>Цена</th></tr>';
      for (var key in cartt) {
        total += '<tr>';
        total += '<td>' + key + '</td>' + '<td>' + cartt[key][0] + '</td>' + '<td>' + cartt[key][1] + '</td>';
        total += '</tr>';
      }
      total += '<tr><td>Общая сумма:</td><td></td><td>' + totalCostt + '</td></tr>';
      total += '</table>';

      var $that = $(this);

      $.ajax({
        url: $that.attr('action'), // путь к обработчику берем из атрибута action
        type: $that.attr('method'), // метод передачи - берем из атрибута method
        data: {name: name, phone: phone, email: email, comment: comment, total: total},
        dataType: 'html',
        success: function(json){
          // В случае успешного завершения запроса...
          if(json){
            $that.replaceWith(json); // заменим форму данными, полученными в ответе.
          }
        }
      });
    });
  });






















  // End
});

//
// var d = document,
//   itemBox = d.querySelectorAll('.item_box'), // блок каждого товара
//   cartCont = d.getElementById('cart_content'); // блок вывода данных корзины
// // Функция кроссбраузерная установка обработчика событий
// function addEvent(elem, type, handler){
//   if(elem.addEventListener){
//     elem.addEventListener(type, handler, false);
//   } else {
//     elem.attachEvent('on'+type, function(){ handler.call( elem ); });
//   }
//   return false;
// }
// // Получаем данные из LocalStorage
// function getCartData(){
//   return JSON.parse(localStorage.getItem('cart'));
// }
// // Записываем данные в LocalStorage
// function setCartData(o){
//   localStorage.setItem('cart', JSON.stringify(o));
//   return false;
// }
// // Добавляем товар в корзину
// function addToCart(e){
//   this.disabled = true; // блокируем кнопку на время операции с корзиной
//   var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
//     parentBox = this.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
//     itemId = this.getAttribute('data-id'), // ID товара
//     itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
//     itemPrice = parentBox.querySelector('.item_price').innerHTML; // стоимость товара
//   if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
//     cartData[itemId][2] += 1;
//   } else { // если товара в корзине еще нет, то добавляем в объект
//     cartData[itemId] = [itemTitle, itemPrice, 1];
//   }
//   // Обновляем данные в LocalStorage
//   if(!setCartData(cartData)){
//     this.disabled = false; // разблокируем кнопку после обновления LS
//     cartCont.innerHTML = 'Товар добавлен в корзину.';
//     setTimeout(function(){
//       cartCont.innerHTML = 'Продолжить покупки...';
//     }, 500);
//   }
//   return false;
// }
// // Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
// for(var i = 0; i < itemBox.length; i++){
//   addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
// }
// // Открываем корзину со списком добавленных товаров
// function openCart(e){
//
//   var cartData = getCartData(), // вытаскиваем все данные корзины
//     totalItems = '',
//     totalCount = 0,
//     totalSum = 0;
//   // если что-то в корзине уже есть, начинаем формировать данные для вывода
//   if(cartData !== null){
//     totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th><th></th></tr>';
//     for(var items in cartData){
//       totalItems += '<tr>';
//       for(var i = 0; i < cartData[items].length; i++){
//         totalItems += '<td>' + cartData[items][i] + '</td>';
//       }
//       totalSum += cartData[items][1] * cartData[items][2];
//       totalCount += cartData[items][2];
//       totalItems += '<td><span class="del_item" data-id="'+ items +'">X</span></td>';
//       totalItems += '</tr>';
//     }
//     totalItems += '<tr><td><strong>Итого</strong></td><td><span id="total_sum">'+ totalSum +'</span> $</td><td><span id="total_count">'+ totalCount +'</span> шт.</td><td></td></tr>';
//     totalItems += '<table>';
//     cartCont.innerHTML = totalItems;
//   } else {
//     // если в корзине пусто, то сигнализируем об этом
//     cartCont.innerHTML = 'В корзине пусто!';
//   }
//   return false;
// }
// // функция для нахождения необходимого ближайшего родительского элемента
// function closest(el, sel) {
//   if (el !== null)
//     return el.matches(sel) ? el : (el.querySelector(sel) || closest(el.parentNode, sel));
// }
// /* Открыть корзину */
// addEvent(d.getElementById('checkout'), 'click', openCart);
// /* Удаление из корзины */
// addEvent(d.body, 'click', function(e){
//   if(e.target.className === 'del_item') {
//     var itemId = e.target.getAttribute('data-id'),
//       cartData = getCartData();
//     if(cartData.hasOwnProperty(itemId)){
//       var tr = closest(e.target, 'tr');
//       tr.parentNode.removeChild(tr); /* Удаляем строку товара из таблицы */
//       // пересчитываем общую сумму и цену
//       var totalSumOutput = d.getElementById('total_sum'),
//         totalCountOutput = d.getElementById('total_count');
//       totalSumOutput.textContent = +totalSumOutput.textContent - cartData[itemId][1] * cartData[itemId][2];
//       totalCountOutput.textContent = +totalCountOutput.textContent - cartData[itemId][2];
//       delete cartData[itemId]; // удаляем товар из объекта
//       setCartData(cartData); // перезаписываем измененные данные в localStorage
//     }
//   }
// }, false);
// /* Очистить корзину */
// addEvent(d.getElementById('clear_cart'), 'click', function(e){
//   localStorage.removeItem('cart');
//   cartCont.innerHTML = 'Корзина очишена.';
// });

$(document).ready(function(){

  var cleave2 = new Cleave('#phone2', {
    phone: true,
    phoneRegionCode: 'ru'
  });

    var cleave = new Cleave('#phone', {
    phone: true,
    phoneRegionCode: 'ru'
  });


});
