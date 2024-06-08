unit uMenuPrincipal;

 interface

uses   Winapi.Windows, System.SysUtils, uIRepositoryCliente, uIrepositoryVeiculo, uIrepositoryLocacao,
uRepositoryCliente, uRepositoryVeiculo, uRepositorylocacao,
uControllercliente, uControllerVeiculo, uControllerLocacao,
uIPresenter, UPresenterStr,  system.DateUtils;


procedure InjecaoDependencia;

procedure Menu;

procedure destroy;

var
 ControllerCliente : Tcontrollercliente;
 ControllerVeiculo  : TControllerVeiculo;
 ControllerLocacao  : TControllerLocacao;

 RepositoryCliente  : IRepositoryCliente;
 RepositoryVeiculo  : IRepositoryVeiculo;
 RepositoryLocacao  : IRepositoryLocacao;

 Presenter          : IPresenter;



procedure clean;

function Modulos : string;


// modulo cliente

procedure Menucliente;
procedure CadastrarCliente;
procedure AlterarCliente;
procedure ExcluirCliente;
procedure ConsultarCliente;




// modulo veiculo

procedure MenuVeiculo;

procedure CadastrarVeiculo;
procedure AlterarVeiculo;
procedure ExcluirVeiculo;
procedure ConsultarVeiculo;




// modulo locação


procedure MenuLocacao;


procedure CadastrarLocacao;
procedure AlterarLocacao;
procedure ExcluirLocacao;
procedure ConsultarLocacao;





implementation

procedure destroy;
begin
  ControllerCliente.Free;
  ControllerVeiculo.Free;
  ControllerLocacao.Free;

end;

procedure InjecaoDependencia;
begin

  Presenter       := TPresenterStr.Create;

 RepositoryCliente := TRepositoryCliente.create;
 RepositoryVeiculo := TRepositoryVeiculo.create;
 RepositoryLocacao := TRepositoryLocacao.create(RepositoryCliente,RepositoryVeiculo);

 ControllerCliente  := TControllercliente.create(RepositoryCliente,Presenter);
 ControllerVeiculo  := TControllerVeiculo.create(RepositoryVeiculo,Presenter);
 ControllerLocacao  := TcontrollerLocacao.create(RepositoryLocacao,
 RepositoryVeiculo,RepositoryCliente,Presenter);

end;


function Modulos : string;
begin

  result := ' 1 - Cadastrar ' + #13#10 +
            ' 2 - Alterar  '  + #13#10 +
            ' 3 - Excluir '    + #13#10 +
            ' 4 - Consultar ' + #13#10 +
            ' 5 - Voltar ';
end;

procedure clean;
var
  stdout: THandle;
  csbi: TConsoleScreenBufferInfo;
  ConsoleSize: DWORD;
  NumWritten: DWORD;
  Origin: TCoord;
begin
  stdout := GetStdHandle(STD_OUTPUT_HANDLE);
  Win32Check(stdout<>INVALID_HANDLE_VALUE);
  Win32Check(GetConsoleScreenBufferInfo(stdout, csbi));
  ConsoleSize := csbi.dwSize.X * csbi.dwSize.Y;
  Origin.X := 0;
  Origin.Y := 0;
  Win32Check(FillConsoleOutputCharacter(stdout, ' ', ConsoleSize, Origin,
    NumWritten));
  Win32Check(FillConsoleOutputAttribute(stdout, csbi.wAttributes, ConsoleSize, Origin,
    NumWritten));
  Win32Check(SetConsoleCursorPosition(stdout, Origin));

end;

procedure menu;
var
 Codigo : integer;
 Modulo : string;
begin

  clean;

  writeln('Menu Principal');
  writeln;

  Modulo := '1 - Clientes' + #13#10 +
            '2 - Veículos'  + #13#10 +
            '3 - Locações';



  writeln(Modulo);
  write(Output,'Opcão:');
  readln(Input,codigo);


  case Codigo of

    1 : MenuCliente;
    2 : MenuVeiculo;
    3 : MenuLocacao;

  end;



end;


procedure Menucliente;
var
 Codigo : integer;
begin

  clean;

  writeln('Menu Clientes');
  writeln;

    writeln(Modulos);
  write(Output,'Opcão:');
  readln(Input,codigo);


  case Codigo of

    1 : CadastrarCliente;
    2 : AlterarCliente;
    3 : Excluircliente;
    4 : ConsultarCliente;
    5 : Menu;
    else
    begin
     writeln('Opção inválida');
     readln;
    end;

  end;

end;


// modulo de cliente
procedure CadastrarCliente;
var
 nome, documento, cep, logradouro, numero, complemento,
 bairro, cidade, uf, telefone, response : string;
begin
 clean;
 writeln('Cadastro de cliente');
 writeln;

 write(output,'Nome: ');
 readln(input,nome);

 write(output,'Documento: ');
 readln(input,documento);

 write(output,'Cep: ');
 readln(input,cep);

 write(output,'Logradouro: ');
 readln(input,logradouro);

 write(output,'Numero: ');
 readln(input,numero);

 write(output,'Complemento: ');
 readln(input,complemento);

 write(output,'Bairro: ');
 readln(input,bairro);

 write(output,'Cidade: ');
 readln(input,cidade);

 write(output,'UF: ');
 readln(input,uf);


 write(output,'Telefone: ');
 readln(input,telefone);

 response := Controllercliente.Cadastrar(nome,documento,cep, logradouro,
 numero,complemento,bairro,cidade,uf, telefone );

 clean;
 writeln(response);
 readln;
 Menu;

end;

procedure AlterarCliente;

var
 id : integer;

 nome, documento, cep, logradouro, numero, complemento,
 bairro, cidade, uf, telefone, response : string;
begin

 clean;
 writeln('Alterar de cliente');
  writeln;

  write(output,'ID: ');
  readln(input,id);


 write(output,'Nome: ');
 readln(input,nome);

 write(output,'Documento: ');
 readln(input,documento);

 write(output,'Cep: ');
 readln(input,cep);

 write(output,'Logradouro: ');
 readln(input,logradouro);

 write(output,'Numero: ');
 readln(input,numero);

 write(output,'Complemento: ');
 readln(input,complemento);

 write(output,'Bairro: ');
 readln(input,bairro);

 write(output,'Cidade: ');
 readln(input,cidade);

 write(output,'UF: ');
 readln(input,uf);


 write(output,'Telefone: ');
 readln(input,telefone);

 response := Controllercliente.Alterar(id, nome,documento,cep, logradouro,
 numero,complemento,bairro,cidade,uf, telefone );

 clean;
 writeln(response);
 readln;
 Menu;


end;

procedure ExcluirCliente;
var
 Id : integer;
 response : string;
begin

 clean;
 writeln('Excluir de cliente');
 writeln;

 write(output,'ID: ');
 readln(input,id);

 response := ControllerCliente.Deletar(id);

 clean;
 writeln(response);
 readln;
 Menu;



end;


procedure ConsultarCliente;
var

 id : integer;
 nome, documento, response : string;

begin

  clean;
  writeln('Consultar de cliente');
  writeln;

  write(output,'ID: ');
  readln(input,id);


  write(output,'Nome: ');
  readln(input,nome);

  write(output,'Documento: ');
  readln(input,documento);


  response := ControllerCliente.Consultar(id,nome,documento);

  clean;
  writeln(response);
  readln;
  Menu;


end;



 // modulo veículo

procedure MenuVeiculo;
var
 Codigo : integer;
begin

  clean;

  writeln('Menu Veículos');
  writeln;

    writeln(Modulos);
  write(Output,'Opcão:');
  readln(Input,codigo);


  case Codigo of

    1 : CadastrarVeiculo;
    2 : AlterarVeiculo;
    3 : ExcluirVeiculo;
    4 : ConsultarVeiculo;
    5 : Menu;
    else
    begin
     writeln('Opção inválida');
     readln;
    end;

  end;

end;


procedure CadastrarVeiculo;
var
 nome , placa, response : string;
 valor : currency;
begin
 clean;
 writeln('Cadastro de Veículo');
 writeln;


  write(output,'Nome: ');
  readln(input,nome);

  write(output,'Placa: ');
  readln(input,placa);

  write(output,'Valor: ');
  readln(input,valor);


  response := ControllerVeiculo.Cadastrar(nome,placa, valor);

  clean;
  writeln(response);
  readln;
  Menu;


end;

procedure AlterarVeiculo;
var
 nome , placa,status, response : string;
 valor : currency;
 id : integer;
begin

 clean;
 writeln('Alterar Veículo');
 writeln;

   write(output,'Id: ');
  readln(input,id);

  write(output,'Nome: ');
  readln(input,nome);

  write(output,'Placa: ');
  readln(input,placa);

  write(output,'Status: ');
  readln(input,status);

  write(output,'Valor: ');
  readln(input,valor);


  response := ControllerVeiculo.Alterar(id, nome,placa,status,valor);

  clean;
  writeln(response);
  readln;
  Menu;


end;

procedure ExcluirVeiculo;
var
 response : string;
 id : integer;
begin

 clean;
 writeln('Excluir Veículo');
 writeln;

  write(output,'Id: ');
  readln(input,id);

 response := ControllerVeiculo.Deletar(id);

  clean;
  writeln(response);
  readln;
  Menu;


end;


procedure ConsultarVeiculo;
var
 Id : integer;
 nome , placa, response : string;
begin

 clean;
 writeln('Consultar de Veículo');
 writeln;

 write(output,'Id: ');
 readln(input,id);

 write(output,'Nome: ');
 readln(input,nome);

 write(output,'Placa: ');
 readln(input,placa);

  response := ControllerVeiculo.Consultar(id,nome, placa);

  clean;
  writeln(response);
  readln;
  Menu;



end;


// modulo de locação

procedure MenuLocacao;
var
 Codigo : integer;
begin

  clean;

  writeln('Menu locações');
  writeln;

  writeln(Modulos);
  write(Output,'Opcão:');
  readln(Input,codigo);


  case Codigo of

    1 : CadastrarLocacao;
    2 : AlterarLocacao;
    3 : ExcluirLocacao;
    4 : ConsultarLocacao;
    5 : Menu;
    else
    begin
     writeln('Opção inválida');
     readln;
    end;

  end;

end;



procedure CadastrarLocacao;
var
 idcliente, idVeiculo : integer;
 response : string;
begin
 clean;
 writeln('Cadastro de Locação');
 writeln;

 write(output,'Cliente: ');
 readln(input,idcliente);

 write(output,'Veículo: ');
 readln(input,idveiculo);

  response := ControllerLocacao.cadastrar(idcliente,idveiculo);

  clean;
  writeln(response);
  readln;
  Menu;

end;

procedure AlterarLocacao;
var
 id, idcliente, idveiculo : integer;
 datadevolucao ,  response : string;

begin

 clean;
 writeln('Alterar Locação');
 writeln;

  write(output,'Id : ');
 readln(input,id);

 write(output,'Cliente: ');
 readln(input,idcliente);

 write(output,'Veículo: ');
 readln(input,idveiculo);


 write(output,'Devolução: ');
 readln(input,dataDevolucao);

 if datadevolucao = '' then datadevolucao := '30/12/1899';


 response := ControllerLocacao.Alterar(id,idcliente,idveiculo,
 StrToDate(dataDevolucao));

  clean;
  writeln(response);
  readln;
  Menu;


end;

procedure ExcluirLocacao;
var
 Id : integer;
 response : string;
begin

 clean;
 writeln('Excluir Locação');
 writeln;

  write(output,'Id: ');
  readln(input,id);

 response := ControllerLocacao.Deletar(id);

  clean;
  writeln(response);
  readln;
  Menu;


end;


procedure ConsultarLocacao;

var
 id, idcliente : integer;
 datalocacao, datadevolucao, response : string;

begin

 clean;
 writeln('Consultar de Locação');
 writeln;

 write(output,'Id: ');
 readln(input,id);


 write(output,'Cliente: ');
 readln(input,idcliente);

 write(output,'Locação: ');
 readln(input,datalocacao);

 write(output,'Devolucao: ');
 readln(input,datadevolucao);


 if dataLocacao   = '' then dataLocacao := '30/12/1899';
 if datadevolucao = '' then datadevolucao := '30/12/1899';



 response := ControllerLocacao.consultar(id,idcliente,
 strTodate(datalocacao),strTodate(datadevolucao));

  clean;
  writeln(response);
  readln;
  Menu;



end;



end.
