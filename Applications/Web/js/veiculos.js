

document.addEventListener('DOMContentLoaded', function() {

  
    
    const incluirBtn     = document.getElementById('incluir');
    const editarBtn      = document.getElementById('editar');
    const excluirBtn     = document.getElementById('excluir');
    const modal          = document.getElementById('modal');
    const span           = document.getElementsByClassName('close')[0];
    const voltarBtn      = document.getElementById('voltar');
    const salvarBtn      = document.getElementById('salvar');
    const consultaBtn    = document.getElementById('consultar');
    const tabelaVeiculos = document.getElementById('tabela-veiculos');
    const Api = UrlApi();
    
    let selectedRow = null;

    const veiculoSelecionado = {

         codigo  : 0,
         nome    : '',
         placa   : '',
         valor   : 0,
         status  : '',
         

    }



    tabelaVeiculos.addEventListener('click', function (e) {
        const row = e.target.closest('tr'); // Encontra a linha clicada
        if (row && row.parentNode.tagName === 'TBODY') { // Garante que clicou em uma linha do corpo da tabela

            if (selectedRow) {
                selectedRow.classList.remove('selected'); // Remove a seleção da linha anterior
              }
              row.classList.add('selected'); // Adiciona a classe à linha clicada
              selectedRow = row;

          
          const cells = row.querySelectorAll('td'); // Obtém todas as células da linha
          let data = [];
          cells.forEach(cell => data.push(cell.textContent.trim())); // Pega os dados de cada célula
          //output.textContent = `Dados da linha: ${data.join(', ')}`; // Exibe os dados
          
          veiculoSelecionado.codigo  = data[0];
          veiculoSelecionado.nome    = data[1];
          veiculoSelecionado.placa   = data[2];
          veiculoSelecionado.valor   = data[3];
          veiculoSelecionado.status  = data[4];

    
        
        }
      });


    salvarBtn.onclick = function() {
        const codigo  = document.getElementById('modalCodigo').value 
        const nome    = document.getElementById('modalNome').value  
        const placa   = document.getElementById('modalPlaca').value 
        let valor   = document.getElementById('modalValor').value 
        const status  = document.getElementById('modalStatus').value 

        if (valor === '')  valor = 0;


        const veiculo = {


            codigo,
            nome ,
            placa,
            valor,
            status          
        }

              
        const options = {

            method : codigo === ''  ? 'POST' : 'PUT',
            body : JSON.stringify(veiculo),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              mode: 'cors'
             
        }

        let url = Api +  '/veiculo/'+ codigo


        fetch(url,options)
        .then(response =>  response.json())
        .then(response => alert(response.Message)  )
        .catch(error => console.error('Erro:', error)); 


    }


    incluirBtn.onclick = function() {

        const codigo  = document.getElementById('modalCodigo')
        const nome    = document.getElementById('modalNome')
        const placa   = document.getElementById('modalPlaca')
        const valor   = document.getElementById('modalValor')
        const status  = document.getElementById('modalStatus')



         codigo.value = '';  
         nome.value   = '';   
         placa.value  = '';  
         valor.value  = '';  
         status.value = '';  

        modal.style.display = 'block';
    }

    editarBtn.onclick = function() {

       if (veiculoSelecionado.codigo === 0)
       {

         alert('selecione um registro')

       } else
       {
        const codigo  = document.getElementById('modalCodigo') 
        const nome    = document.getElementById('modalNome')  
        const placa   = document.getElementById('modalPlaca') 
        const valor   = document.getElementById('modalValor') 
        const status  = document.getElementById('modalStatus') 


         codigo.value  = veiculoSelecionado.codigo;        
         nome.value    = veiculoSelecionado.nome; 
         placa.value   = veiculoSelecionado.placa;
         valor.value   = veiculoSelecionado.valor;
         status.value  = veiculoSelecionado.status;
        
         modal.style.display = 'block';

       }
        
       
    }


    excluirBtn.onclick = function() {
        if (veiculoSelecionado.codigo === 0)
            {
     
              alert('selecione um registro')
     
            } else
            {
                const msg = `confirma exclusão registro :  Código ${veiculoSelecionado.codigo}  Nome:  ${veiculoSelecionado.nome} 
                `
     
                if (window.confirm(msg)) 
                {

                    const options = {

                        method : 'DELETE',
                         headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          mode: 'cors'
                         
                    }
            
                    let url = Api + '/veiculo/'+ veiculoSelecionado.codigo
            
            
                    fetch(url,options)
                    .then(response =>  response.json())
                    .then(response => alert(response.Message)  )
                    .catch(error => console.error('Erro:', error)); 

                }
     
            }
    }



 

    span.onclick = function() {
        modal.style.display = 'none';
    }

    voltarBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

   
     consultaBtn.onclick = function () { 


 
        const codigo  = document.getElementById('codigo').value 
        const nome    = document.getElementById('nome').value  
        const placa   = document.getElementById('placa').value 
     
 

        const params =  new URLSearchParams({
            id:codigo,
            nome :nome,
            placa :placa
         });

        const url = Api + `/veiculos?${params}`

                 
        fetch(url)
            .then(response => response.json())
             .then( response  => {

              
                
               const {Data} = response
          
                
               tabelaVeiculos.innerHTML = '';
               Data.forEach(veiculo => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${veiculo.Id}</td>
                        <td>${veiculo.Nome}</td>
                        <td>${veiculo.Placa}</td>
                        <td>${veiculo.Valor}</td>
                        <td>${veiculo.Status}</td>  
                    `;
                    tabelaVeiculos.appendChild(row);
                });


                alert(response.Message)

               
                

            }).catch(error => console.error('Erro:', error));
    };
   
});
