

document.addEventListener('DOMContentLoaded', function() {

  
    
    const incluirBtn    = document.getElementById('incluir');
    const editarBtn    = document.getElementById('editar');
    const excluirBtn    = document.getElementById('excluir');
    const modal         = document.getElementById('modal');
    const span           = document.getElementsByClassName('close')[0];
    const voltarBtn      = document.getElementById('voltar');
    const salvarBtn      = document.getElementById('salvar');
    const consultaBtn    = document.getElementById('consultar');
    const tabelaClientes = document.getElementById('tabela-clientes');
    const Api = UrlApi();
    
    let selectedRow = null;

    const clienteSelecionado = {

         codigo      : 0,
         nome        : '',
         documento   : '',
         cep         : '',
         logradouro  : '',
         numero      : '',
         complemento : '',
         bairro      : '',
         cidade      : '',
         uf          : '',
         telefone    : ''    

    }



    tabelaClientes.addEventListener('click', function (e) {
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
          
          clienteSelecionado.codigo      = data[0];
          clienteSelecionado.nome        = data[1];
          clienteSelecionado.documento   = data[2];
          clienteSelecionado.cep         = data[3];
          clienteSelecionado.logradouro  = data[4];
          clienteSelecionado.numero      = data[5];
          clienteSelecionado.complemento = data[6];
          clienteSelecionado.bairro      = data[7];
          clienteSelecionado.cidade      = data[8];
          clienteSelecionado.uf          = data[9];
          clienteSelecionado.telefone    = data[10];

          
           
        
        }
      });


    salvarBtn.onclick = function() {
        const codigo      = document.getElementById('modalCodigo').value 
        const nome        = document.getElementById('modalNome').value  
        const documento   = document.getElementById('modalDocumento').value 
        const cep         = document.getElementById('modalCep').value 
        const logradouro  = document.getElementById('modalLogradouro').value 
        const numero      = document.getElementById('modalNumero').value 
        const complemento = document.getElementById('modalComplemento').value 
        const bairro      = document.getElementById('modalBairro').value 
        const cidade      = document.getElementById('modalCidade').value 
        const uf          = document.getElementById('modalUf').value 
        const telefone    = document.getElementById('modalTelefone').value 


        const cliente = {


            codigo,
            nome ,
            documento,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            telefone
        }

              
        const options = {

            method : codigo === ''  ? 'POST' : 'PUT',
            body : JSON.stringify(cliente),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              mode: 'cors'
             
        }

        let url = Api +  '/cliente/'+ codigo


        fetch(url,options)
        .then(response =>  response.json())
        .then(response => alert(response.Message)  )
        .catch(error => console.error('Erro:', error)); 


    }


    incluirBtn.onclick = function() {

        const codigo      = document.getElementById('modalCodigo') 
        const nome        = document.getElementById('modalNome')  
        const documento   = document.getElementById('modalDocumento') 
        const cep         = document.getElementById('modalCep') 
        const logradouro  = document.getElementById('modalLogradouro') 
        const numero      = document.getElementById('modalNumero') 
        const complemento = document.getElementById('modalComplemento') 
        const bairro      = document.getElementById('modalBairro') 
        const cidade      = document.getElementById('modalCidade') 
        const uf          = document.getElementById('modalUf') 
        const telefone    = document.getElementById('modalTelefone') 


         codigo.value      = '';  
         nome.value        = '';   
         documento.value   = '';  
         cep.value         = '';  
         logradouro.value  = '';  
         numero.value      = '';  
         complemento.value = '';  
         bairro.value      = '';  
         cidade.value      = '';  
         uf.value          = '';  
         telefone.value    = '';  
         
       

        modal.style.display = 'block';
    }

    editarBtn.onclick = function() {

       if (clienteSelecionado.codigo === 0)
       {

         alert('selecione um registro')

       } else
       {
        const codigo      = document.getElementById('modalCodigo') 
        const nome        = document.getElementById('modalNome')  
        const documento   = document.getElementById('modalDocumento') 
        const cep         = document.getElementById('modalCep') 
        const logradouro  = document.getElementById('modalLogradouro') 
        const numero      = document.getElementById('modalNumero') 
        const complemento = document.getElementById('modalComplemento') 
        const bairro      = document.getElementById('modalBairro') 
        const cidade      = document.getElementById('modalCidade') 
        const uf          = document.getElementById('modalUf') 
        const telefone    = document.getElementById('modalTelefone') 


         codigo.value      = clienteSelecionado.codigo;        
         nome.value        = clienteSelecionado.nome; 
         documento.value   = clienteSelecionado.documento;
         cep.value         = clienteSelecionado.cep;
         logradouro.value  = clienteSelecionado.logradouro;
         numero.value      = clienteSelecionado.numero;
         complemento.value = clienteSelecionado.complemento;
         bairro.value      = clienteSelecionado.bairro;
         cidade.value      = clienteSelecionado.cidade;
         uf.value          = clienteSelecionado.uf;
         telefone.value    = clienteSelecionado.telefone;

         modal.style.display = 'block';

       }
        
       
    }


    excluirBtn.onclick = function() {
        if (clienteSelecionado.codigo === 0)
            {
     
              alert('selecione um registro')
     
            } else
            {
                const msg = `confirma exclusão registro :  Código ${clienteSelecionado.codigo}  Nome:  ${clienteSelecionado.nome} 
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
            
                    let url = Api + '/cliente/'+ clienteSelecionado.codigo
            
            
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


 
        const codigo      = document.getElementById('codigo').value 
        const nome        = document.getElementById('nome').value  
        const documento   = document.getElementById('documento').value 
     
 

        const params =  new URLSearchParams({
            id:codigo,
            nome :nome,
            documento :documento
         });

        const url = Api + `/clientes?${params}`

    
            
        fetch(url)
            .then(response => response.json())
             .then( response  => {

              
                
               const {Data} = response
                
               tabelaClientes.innerHTML = '';
               Data.forEach(cliente => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${cliente.Id}</td>
                        <td>${cliente.Nome}</td>
                        <td>${cliente.Documento}</td>
                        <td>${cliente.Cep}</td>
                        <td>${cliente.Logradouro}</td>
                        <td>${cliente.Numero}</td>
                        <td>${cliente.Complemento}</td>
                        <td>${cliente.Bairro}</td>
                        <td>${cliente.Cidade}</td>
                        <td>${cliente.UF}</td>
                        <td>${cliente.Telefone}</td>
                    `;
                    tabelaClientes.appendChild(row);
                });


                alert(response.Message)

               
                

            }).catch(error => console.error('Erro:', error));
    };
   
});
