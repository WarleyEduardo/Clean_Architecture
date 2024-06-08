unit uRoute.Clientes;

interface

uses horse, uController.Clientes;

procedure RouteCliente;

implementation

procedure RouteCliente;
begin


 // cadastrar

  Thorse.Post('/api/cliente',postCliente);

 // alterar

 Thorse.Put('/api/cliente/:id',putCliente);

 // excluir

 Thorse.delete('/api/cliente/:id',deleteCliente);

 // consultar

  Thorse.get('/api/clientes',getClientes);

end;

end.
