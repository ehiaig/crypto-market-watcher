(function (w, io)
{
   'use strict';
   //localise Static Objects from base.js
   let Bu = Barge.utils,
       Ba = Barge.Array,
       Bs = Barge.String, //NIU atm
       Bm = Barge.Math,
       Bd = Barge.Dom;

   let Table = new Barge.Dom.Table(Bd.getEl(".data-table"), { stickOnScroll : false }),
       jx    = new Barge.Ajax();
   //Table.insert([["id", "buy_order_id", "sell_order_id", "currency", "amount", "price", "timestamp"]]);
   let exchangeData      = null,
       exchangeDataArray = [
          {
             bitstamp : { price : 0, change : "start" },
             gdax     : { price : 0, change : "start" },
             bitMex   : { price : 0, change : "start" },
             bittrex  : { price : 0, change : "start" },
             bitfinex : { price : 0, change : "start" },
             cex      : { price : 0, change : "start" },
             okcoin   : { price : 0, change : "start" },
             poloniex : { price : 0, change : "start" },
             gemini   : { price : 0, change : "start" }
          }
       ];

   let socket = io.connect('http://localhost:3000');

   socket.on('connect', function ()
   {
      console.log('Connected from Client')
   });

   function getChangeTag(val, previousVal)
   {
      if (Bu.defined(val)&& Bu.defined(previousVal))
      {
         if (val === 0 || Bs.isEmpty(val))
         {
            return "start"
         }
         if (val > previousVal)
         {
            return "up";
         }
         else if (val < previousVal)
         {
            return "down";
         }
         else if (val === previousVal)
         {
            return "same";
         }
      }

      return "start"
   }

   socket.on('bitcoin', function (data)
   {
      //Table.clearRows();
      //
      //Table.insert([
      //                [
      //                   data["bitstamp"],
      //                   data["gdax"],
      //                   data["bitMex"],
      //                   data["bittrex"],
      //                   data["bitfinex"],
      //                   data["cex"],
      //                   data["okcoin"],
      //                   data["poloniex"],
      //                   data["gemini"]
      //                ]
      //             ]);

      console.log(data);
      for (let key in data)
      {
         let prev = exchangeData ? exchangeData[key]["price"] : 0;
         data[key] = { price : data[key], change : getChangeTag(data[key], prev) }
      }
      exchangeData = data;

      
      Ba.clear(exchangeDataArray);
      exchangeDataArray.push(data);
   });

   let app = new Vue({
                        el      : "#cryptos-container",
                        data    : {
                           exchangeDataArray : exchangeDataArray
                        },
                        methods : {}
                     });

}(window, io));
