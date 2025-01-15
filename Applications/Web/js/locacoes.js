

document.addEventListener('DOMContentLoaded', function() {

  
    
    const incluirBtn     = document.getElementById('incluir');
    const editarBtn      = document.getElementById('editar');
    const excluirBtn     = document.getElementById('excluir');
    const modal          = document.getElementById('modal');
    const span           = document.getElementsByClassName('close')[0];
    const voltarBtn      = document.getElementById('voltar');
    const salvarBtn      = document.getElementById('salvar');
    const consultaBtn    = document.getElementById('consultar');
    const tabelaLocacoes = document.getElementById('tabela-locacoes');
    const nomeCliente  = document.getElementById('modalNomeCliente') 
    const nomeVeiculo  = document.getElementById('modalNomeVeiculo') 



    const Api = UrlApi();
    
    let selectedRow = null;

    const locacaoSelecionada = {

         codigo      : 0,
         cliente     : 0,
         nomeCliente : '',
         veiculo     : 0,
         nomeVeiculo : '',
         locacao     : '',
         devolucao : '',
         total      : 0      
       
    }


    tabelaLocacoes.addEventListener('click', function (e) {
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

         
          locacaoSelecionada.codigo       = data[0];
          locacaoSelecionada.cliente      = data[1];
          locacaoSelecionada.nomeCliente  = data[2];
          locacaoSelecionada.veiculo      = data[3];
          locacaoSelecionada.nomeVeiculo  = data[4];
          locacaoSelecionada.locacao      = data[5];
          locacaoSelecionada.devolucao    = data[6];
          locacaoSelecionada.total        = data[7];
          
        
        }
      });


      nomeCliente.onchange = function() {

        const cliente   = document.getElementById('modalCliente')  

        const nomeCliente   = document.getElementById('modalNomeCliente').value  

        cliente.value =  nomeCliente;
          
      }


      nomeVeiculo.onchange = function() {


        const veiculo   = document.getElementById('modalVeiculo')  

        const nomeVeiculo   = document.getElementById('modalNomeVeiculo').value  

        veiculo.value =  nomeVeiculo;
    }


    salvarBtn.onclick = function() {


        const codigo    = document.getElementById('modalCodigo').value 
        const cliente   = document.getElementById('modalCliente').value  
        const veiculo   = document.getElementById('modalVeiculo').value 
        const devolucao = document.getElementById('modalDevolucao').value 
       

        const locacao = {

            idcliente     : cliente ,
            idveiculo     : veiculo,
            datadevolucao : devolucao
          
        }

               
        const options = {

            method : codigo === ''  ? 'POST' : 'PUT',
            body : JSON.stringify(locacao),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              mode: 'cors'
             
        }

        let url = Api +  '/locacao/'+ codigo;
      
        fetch(url,options)
        .then(response =>  response.json())
        .then(response => alert(response.Message)  )
        .catch(error => console.error('Erro:', error)); 


    }

    const preencherClientes = async () =>{


        const url = Api + `/clientes`

    
            
       await fetch(url)
            .then(response => response.json())
             .then( response  => {

               const nomeCliente  = document.getElementById('modalNomeCliente') 
                
               const {Data} = response
              
               Data.forEach(cliente => {
                   const option = document.createElement('option');
                   option.value = cliente.Id; 
                   option.textContent = cliente.Nome;

                   nomeCliente.appendChild(option);
                });


            }).catch(error => console.error('Erro:', error));



    }


    const preencherVeiculos = async () => {


        
          

        const url = Api + `/veiculos`

    
            
      await  fetch(url)
            .then(response => response.json())
             .then( response  => {

               const nomeVeiculo  = document.getElementById('modalNomeVeiculo') 
                
               const {Data} = response
              
               Data.forEach(veiculo => {
                   const option = document.createElement('option');
                   option.value = veiculo.Id; 
                   option.textContent = veiculo.Nome;

                   nomeVeiculo.appendChild(option);
                });


            }).catch(error => console.error('Erro:', error));   


    }


    incluirBtn.onclick = function() {

        const codigo       = document.getElementById('modalCodigo') 
        const cliente      = document.getElementById('modalCliente')  
        const nomeCliente  = document.getElementById('modalNomeCliente') 
        const veiculo      = document.getElementById('modalVeiculo') 
        const nomeVeiculo  = document.getElementById('modalNomeVeiculo') 
        const locacao      = document.getElementById('modalLocacao') 
        const devolucao    = document.getElementById('modalDevolucao') 
        const total        = document.getElementById('modalTotal')   
        
        

        preencherClientes();
         
        preencherVeiculos()

         codigo.value      = '';  
         cliente.value     = '';   
         nomeCliente.value  = 0;  
         veiculo.value      = '';  
         nomeVeiculo.value  = 0;  
         locacao.value      = '';  
         devolucao.value    = '';  
         total.value        = '';  
       

        modal.style.display = 'block';
    }

     editarBtn.onclick = async function() {

       if (locacaoSelecionada.codigo === 0)
       {

         alert('selecione um registro')

       } else
       {


       await  preencherClientes();
         
       await  preencherVeiculos()
        

        const codigo       = document.getElementById('modalCodigo') 
        const cliente      = document.getElementById('modalCliente')  
        const nomeCliente  = document.getElementById('modalNomeCliente') 
        const veiculo      = document.getElementById('modalVeiculo') 
        const nomeVeiculo  = document.getElementById('modalNomeVeiculo') 
        const locacao      = document.getElementById('modalLocacao') 
        const devolucao    = document.getElementById('modalDevolucao') 
        const total        = document.getElementById('modalTotal')  
        
        
       


         codigo.value       = locacaoSelecionada.codigo;        
         cliente.value      = locacaoSelecionada.cliente; 
         nomeCliente.value  = locacaoSelecionada.cliente; 
         veiculo.value      = locacaoSelecionada.veiculo;
         nomeVeiculo.value  = locacaoSelecionada.veiculo;
         locacao.value      = locacaoSelecionada.locacao;
         devolucao.value    = locacaoSelecionada.devolucao;
         total.value        = locacaoSelecionada.total;
       
         modal.style.display = 'block';

       }
        
       
    }


    excluirBtn.onclick = function() {
        if (locacaoSelecionada.codigo === 0)
            {
     
              alert('selecione um registro')
     
            } else
            {
                const msg = `confirma exclusão registro :  Código ${locacaoSelecionada.codigo}  Nome:  ${locacaoSelecionada.nomeCliente} 
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
            
                    let url = Api + '/locacao/'+ locacaoSelecionada.codigo
            
            
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

 
        const codigo     = document.getElementById('codigo').value 
        const cliente    = document.getElementById('cliente').value  
        const locacao    = document.getElementById('locacao').value 
        const devolucao  = document.getElementById('devolucao').value 
 

        const params =  new URLSearchParams({
            idLocacao     : codigo,
            idcliente     : cliente,
            DataLocacao   : locacao,
            DataDevolucao : devolucao
         });

        const url = Api + `/locacoes?${params}`

    
            
        fetch(url)
            .then(response => response.json())
             .then( response  => {              
                
               const {Data} = response
                
               tabelaLocacoes.innerHTML = '';
               Data.forEach(locacao => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                         <td>${locacao.Id}</td>
                        <td>${locacao.Cliente.Id}</td>
                        <td>${locacao.Cliente.Nome}</td>
                        <td>${locacao.Veiculo.Id}</td>
                        <td>${locacao.Veiculo.Nome}</td>
                        <td>${locacao.DataLocacao}</td>
                        <td>${locacao.DataDevolucao}</td>   
                        <td>${locacao.Total.toFixed(2)}</td>
                    `;
                    tabelaLocacoes.appendChild(row);
                });


                alert(response.Message)

               
                

            }).catch(error => console.error('Erro:', error));
    };
   
});
