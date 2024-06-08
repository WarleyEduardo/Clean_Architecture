unit uIRepositoryVeiculo;

interface

uses uVeiculo,uDtoVeiculo, system.Generics.Collections;


type

 IRepositoryVeiculo = interface

  procedure Cadastrar(veiculo : TVeiculo);
  procedure Alterar(veiculo : Tveiculo);
  procedure Excluir(codigo : integer);
  Function Consultar(dto: DtoVeiculo) :Tlist<TVeiculo>;

 end;


implementation

end.
