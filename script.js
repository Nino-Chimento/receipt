const basket1 = [
  {
    quantity: 2,
    description: "book at",
    price: 12.49,
  },
  {
    quantity: 1,
    description: "music CD at",
    price: 14.99,
  },
  {
    quantity: 1,
    description: "chocolate bar at",
    price: 0.85,
  },
];

const basket2 = [
  {
    quantity: 1,
    description: "imported box of chocolates at",
    price: 10.0,
  },
  {
    quantity: 1,
    description: "imported bottle of perfume at",
    price: 47.5,
  },
];
const basket3 = [
  {
    quantity: 1,
    description: "imported bottle of perfume at",
    price: 27.99,
  },
  {
    quantity: 1,
    description: "bottle of perfume at",
    price: 18.99,
  },
  {
    quantity: 1,
    description: "packet of headache pills at",
    price: 9.75,
  },
  {
    quantity: 3,
    description: "box of imported chocolates at",
    price: 11.25,
  },
];

// L'imposta di base sulle vendite è applicabile con un'aliquota del 10% su tutti i beni, ad eccezione di libri, cibo e
// prodotti medici esenti. Il dazio all'importazione è un'imposta aggiuntiva sulle vendite applicabile a tutti
// merci importate ad un tasso del 5%, senza esenzioni.
// Quando acquisto gli articoli ricevo una ricevuta che elenca il nome di tutti gli articoli e il loro prezzo
// (tasse incluse), terminando con il costo totale degli articoli e gli importi totali delle imposte sulle vendite
// pagato. Le regole di arrotondamento per l'imposta sulle vendite sono che per un'aliquota fiscale di n%, un prezzo di scaffale di p contiene
// (np / 100 arrotondato allo 0,05 più vicino) importo dell'imposta sulle vendite.

function roundHalf(num) {
  return (num * 2) / 2;
}

function calculate(array) {
  let basketOutput = [];
  let receipt = [];
  let totalTax = 0;
  let total = 0;
  array.forEach((product) => {
    let productOutput = {};
    // controllo i prodotti esenti dal 10% di iva
    if (
      product["description"].includes("book") ||
      product["description"].includes("chocolates") ||
      product["description"].includes("pills") ||
      product["description"].includes("chocolate")
    ) {
      productOutput["quantity"] = product["quantity"];
      productOutput["description"] = product["description"];
      productOutput["total"] = product["quantity"] * product["price"];
      productOutput["total"] = roundHalf(productOutput["total"]);
      productOutput["tax"] = 0;
    } // tutte le altre opzioni con il 10 %
    else {
      productOutput["tax"] = ((product["price"] * 10) / 100).toFixed(2);
      productOutput["tax"] = Number(productOutput["tax"]);
      productOutput["quantity"] = product["quantity"];
      productOutput["description"] = product["description"];
      productOutput["total"] = (
        product["quantity"] *
        (product["price"] + productOutput["tax"])
      ).toFixed(2);
      productOutput["total"] = roundHalf(productOutput["total"]);
    } //aggiungo il 5% alle merci importate
    if (product["description"].includes("imported")) {
      let taxImported = ((productOutput["total"] * 5) / 100).toFixed(2);
      taxImported = roundHalf(taxImported);
      productOutput["tax"] = productOutput["tax"] + taxImported;
      productOutput["total"] = productOutput["total"] + taxImported;
    }
    basketOutput = [...basketOutput, productOutput];
  });
  //creo carrello finale formatto valori di output
  basketOutput.forEach((productFinal) => {
    let product = {};
    product["quantity"] = productFinal["quantity"];
    product["description"] = productFinal["description"].replace("at", "");
    product["total"] = productFinal["total"];
    receipt.push(product);
    totalTax = totalTax + productFinal["tax"];
    total = total + productFinal["total"];
  });
  receipt = [...receipt, totalTax, total];
  return receipt;
}
