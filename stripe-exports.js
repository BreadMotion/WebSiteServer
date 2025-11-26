require("dotenv").config();

//config stripe
var stripe = require("stripe")(process.env.token);

//customer_email:顧客のメールアドレス
exports.stripe_create_customer = function (customer_email) {
  stripe.customers.create(
    {
      email: customer_email,
    },
    function (err, customer) {
      // asynchronously called
      console.log(customer);
    },
  );
};

//id:顧客のID
//num:カード番号, month:カードの有効期限, year:カードの有効期限, cvc:カードのセキュリティ番号
exports.stripe_create_card = function (
  id,
  num,
  month,
  year,
  cvc,
) {
  console.log(id, num, month, year, cvc);
  stripe.tokens.create(
    {
      card: {
        number: num,
        exp_month: month,
        exp_year: year,
        cvc: cvc,
      },
    },
    function (err, token) {
      // asynchronously called
      var params = {
        source: token.id,
      };
      stripe.customers.createSource(
        id,
        params,
        function (err, card) {
          console.log(card);
        },
      );
    },
  );
};

//price:請求価格, description:説明, customer_id:顧客のID
exports.stripe_charge = function (
  price,
  description,
  customer_id,
) {
  var charge = stripe.charges.create({
    amount: price,
    currency: "jpy",
    description: description,
    customer: customer_id,
  });
};
