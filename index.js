{
  // task "Literals"
  const cat = {
    name: "Lucius",
    breed: "garden cat",
    weight: "10 kg",
    coat: "red"
  }

  const user = {
    name: "Dan",
    surname: "Mikelson",
    age: 25,
    hobby: "football",
    food: "black"
  } 
}

{
  //task "Literals expand"
  const keyFirst = prompt("Enter the name of the first key:");
  const valueFirst = prompt("Enter the name of the first value:");

  const keySecond = prompt("Enter the name of the second key:");
  const valueSecond = prompt("Enter the name of the second value:");

  const objLiterals = {
    [keyFirst]: valueFirst,
    [keySecond]: valueSecond
  };
  console.log("objLiterals>>>", objLiterals);
}

{
  // task "Literals copy"
  const keyThird = prompt("Enter the name of the third key:");
  const valueThird = prompt("Enter the name of the third value:");
  const newObj = {
    ...objLiterals,
    [keyThird]: valueThird
  };
  console.log(newObj);
}

{
  // task "Html tree" 
  // task "Parent"
  //task "Change OK"
  let htmlTree = {
    tagName: "body",
    children: [
      {
        tagName: "div",
        parent: "body",
        children: [
          {
            tagName: "span",
            parent: "div",
            children: ["Enter a data please:"]
          },
          {
            tagName: "input",
            parent: "div",
            attrs: {
              type: "text",
              id: "name"
            }
          },
          {
            tagName: "input",
            parent: "div",
            attrs: {
              type: "text",
              id: "surname"
            }
          }
        ]
      },
      {
        tagName: "div",
        parent: "body",
        children: [
          {
            tagName: "button",
            parent: "div",
            attrs: {
              id: "ok"
            },
            children: ["OK"]
          },
          {
            tagName: "button",
            parent: "div",
            attrs: {
              id: "cancel"
            },
            children: ["Cancel"]
          }
        ]
      }
    ]
  }
  const cancelBtnText = htmlTree.children[1].children[1].children[0];
  console.log(cancelBtnText); 
  const inputText = htmlTree.children[0].children[2].attrs.id;
  console.log(inputText);


  const newId = prompt("Enter new id for the 'OK' button");
  const okButton = htmlTree.children[1].children[0];
  okButton.attrs.id = newId;
  console.log(htmlTree);
}

{
  //task "Destructure"

  const {children:[spanText]} = htmlTree.children[0];
  console.log(spanText.children[0]); 


  const { children: [cancelButton, okButton] } = htmlTree.children[1];
  console.log(okButton.children[0]); 

  const { attrs: { id: secondInputId } } = htmlTree.children[0].children[2];
  console.log(secondInputId); 
}

{
  // task "Destruct array"

  let arr = [1, 2, 3, 4, 5, "a", "b", "c"];
  const [odd1, even1, odd2, even2, odd3, ...letters] = arr;
  console.log(odd1, even1, odd2, even2, odd3); 
  console.log(letters); 
}

{
  // task "Destruct string"

  let arr = [1, "abc"];
  const [number, str] = arr; 
  const [s1, s2, s3] = str.split("");
  console.log(number); 
  console.log(s1); 
  console.log(s2); 
  console.log(s3);
}


{
  // task "Destruct 2"

  let obj = {
      name: 'Ivan',
      surname: 'Petrov',
      children: [
          {
              name: 'Maria'
          },
          {
              name: 'Nikolay'
          }
      ]
  }
  const [{ name: name1 }, { name: name2 }] = obj.children;

  console.log(name1); 
  console.log(name2); 
}


{
  // task "Destruct 3"

  let arr = [1,2,3,4,5,6,7,10];
  const [a, b, ...rest] = arr; 
  const length = arr.length;  
  console.log(a);      
  console.log(b); 
  console.log(length);
}


{
  // task "Copy delete"

  const  {name, ...copy} = cat;
  console.log(copy);
}


{
  // task "Currency real rate"

  fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
      const rates = data.rates; 
      const currencies = Object.keys(rates); 
      const inputCurrency = prompt(`Enter the input currency (${currencies.join(', ')}):`).toUpperCase();
      const outputCurrency = prompt(`Enter the currency to be converted (${currencies.join(', ')}):`).toUpperCase();
      const amount = parseFloat(prompt('Enter the amount in the input currency:'));

      if (isNaN(amount) || !currencies.includes(inputCurrency) || !currencies.includes(outputCurrency)) {
        console.log('Error: Invalid input data');
      } else {
        const rate = rates[outputCurrency] / rates[inputCurrency]; 
        const result = (amount * rate).toFixed(2); 
        console.log(`${amount} ${inputCurrency} = ${result} ${outputCurrency}`); 
      }
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
}


{
  // task "Currency drop down"

  fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
      .then(data => {
          const rates = Object.keys(data.rates);
          console.log(rates);
          let str = "<select>";
          for (const currency of rates){
          str+= `<option value="${currency}">${currency}</option>`;
          }
          str+= "</select>";
          document.write(str);
          console.log(data) 
    })
}


{
  // task "Currency table"

  fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
      const rates = data.rates;
      const currencies = Object.keys(rates);
      const table = document.createElement('table'); 
      const headerRow = document.createElement('tr'); 
      const emptyHeaderCell = document.createElement('th'); 
      headerRow.appendChild(emptyHeaderCell); 

      for (let currency of currencies) {
        const headerCell = document.createElement('th');
        headerCell.textContent = currency;
        headerRow.appendChild(headerCell);
      }

      table.appendChild(headerRow); 

      for (let inputCurrency of currencies) {
        const row = document.createElement('tr');
        const headerCell = document.createElement('th');
        headerCell.textContent = inputCurrency;
        row.appendChild(headerCell);

        for (let outputCurrency of currencies) {
          const cell = document.createElement('td');

          if (inputCurrency === outputCurrency) {
            cell.textContent = '1.00'; 
          } else {
            const rate = rates[outputCurrency] / rates[inputCurrency];
            cell.textContent = rate.toFixed(2);
          }

          row.appendChild(cell);
        }

        table.appendChild(row); 
      }

      document.body.appendChild(table); 
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
}

  
{
  // task "Form"

  const car = {
      "Name":"chevrolet chevelle malibu",
      "Cylinders":8,
      "Displacement":307,
      "Horsepower":130,
      "Weight_in_lbs":3504,
      "Origin":"USA",
      "in_production": false
  }
  let str = "<form style='display: flex; flex-direction: column;'>" 
      for (const key in car){
          const type = typeof car[key] === 'string' ? 'text' : typeof car[key] === 'number' ? 'number' : 'checkbox';
          str += `<label>${key}: <input type="${type}" value="${car[key]}"/></label>`
      }
  str += "</form>"
  document.write(str);
}


{
  // task "Table"

  const persons = [
      {
          "Name":"chevrolet chevelle malibu",
          "Cylinders":8,
          "Displacement":307,
          "Horsepower":130,
          "Weight_in_lbs":3504,
          "Origin":"USA"
      },
      {
          "Name":"buick skylark 320",
          "Miles_per_Gallon":15,
          "Cylinders":8,
          "Displacement":350,
          "Horsepower":165,
          "Weight_in_lbs":3693,
          "Acceleration":11.5,
          "Year":"1970-01-01",
      },
      {
          "Miles_per_Gallon":18,
          "Cylinders":8,
          "Displacement":318,
          "Horsepower":150,
          "Weight_in_lbs":3436,
          "Year":"1970-01-01",
          "Origin":"USA"
      },
      {
          "Name":"amc rebel sst",
          "Miles_per_Gallon":16,
          "Cylinders":8,
          "Displacement":304,
          "Horsepower":150,
          "Year":"1970-01-01",
          "Origin":"USA"
      },
  ]
    
    const columns = [];
    persons.forEach((person) => {
      Object.keys(person).forEach((key) => {
        if (!columns.includes(key)) {
          columns.push(key);
        }
      });
    });
    console.log("columns>>>", columns);
    let tableHtml = '<table><thead><tr>';
    columns.forEach((column) => {
      tableHtml += `<th>${column}</th>`;
    });
    tableHtml += '</tr></thead>';
    
    tableHtml += '<tbody>';
    persons.forEach((person) => {
      tableHtml += '<tr>';
      columns.forEach((column) => {
        tableHtml += `<td>${person[column] || ''}</td>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table>';
    document.write(tableHtml);
    console.log(tableHtml);
}