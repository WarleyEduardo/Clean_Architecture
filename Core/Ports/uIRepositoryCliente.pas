unit uIRepositoryCliente;

interface

uses uCliente, uDtoCliente, system.Generics.Collections;

type

 IRepositoryCliente = interface

  procedure Cadastrar(cliente : Tcliente);
  procedure Alterar(cliente : Tcliente);
  procedure Excluir(codigo : integer);
 // Function Consultar(dto: DtoCliente) :TObjectlist<Tcliente>;
  Function Consultar(dto: DtoCliente) :Tlist<Tcliente>;
 end;


implementation

end.
