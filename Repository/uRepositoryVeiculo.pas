unit uRepositoryVeiculo;

interface

uses uVeiculo, uDtoVeiculo, uIRepositoryVeiculo, system.Generics.Collections,
system.SysUtils, uConfiguracaoDb, uUtils;

type

 TRepositoryVeiculo = class(TinterfacedObject, IRepositoryVeiculo)
  private
    FLista: TList<TVeiculo>;
    ConfiguracaoDb : TConfiguracaoDB;
    procedure SetLista(const Value: TList<TVeiculo>);
  published

   procedure Cadastrar(veiculo : TVeiculo);
  procedure Alterar(veiculo : Tveiculo);
  procedure Excluir(codigo : integer);
  Function Consultar(dto: DtoVeiculo) :TList<TVeiculo>;


   property Lista : TList<TVeiculo> read FLista write SetLista;

   constructor create;
  destructor destroy;
  //;override;

 end;

implementation

{ TRepositoryVeiculo }

procedure TRepositoryVeiculo.Alterar(veiculo: Tveiculo);
var
 sql : string;
begin

   sql:= 'update veiculos set ' +
          'nome = '   + QuotedStr(veiculo.Nome) + ','+
          'placa = '  + Quotedstr(veiculo.Placa) + ',' +
          'valor = '  + stringReplace(currTostr(veiculo.valor),',','.',[]) + ',' +
          'status = ' + QuotedStr(ConverterStatusStr(veiculo.status)) +
          ' where id = ' + intToStr(veiculo.Id) ;

    Configuracaodb.ExecSql(sql);

end;

procedure TRepositoryVeiculo.Cadastrar(veiculo: TVeiculo);
var
 sql : string;
begin

   Sql := 'insert into veiculos (nome,placa,valor,status) ' +
          'values (' +
          QuotedStr(veiculo.Nome) + ',' +
          QuotedStr(veiculo.placa) + ',' +
          stringReplace(currTostr(veiculo.valor),',','.',[]) + ',' +
          QuotedStr(ConverterStatusStr(veiculo.status))+ ')' ;

   Configuracaodb.ExecSql(sql);

end;

function TRepositoryVeiculo.Consultar(dto: DtoVeiculo): TList<TVeiculo>;
var
 sql : string;
 veiculo : TVeiculo;
begin

  sql := 'select * from veiculos where 1 = 1 ' ;

   if dto.id >  0 then
   begin

     sql := sql + ' and id =  ' + inttoStr(dto.id);
   end else
   begin

     if trim(dto.Nome) <> '' then
     begin
       sql := sql + ' and nome like ' + Quotedstr('%' + dto.Nome + '%');
     end;

     if trim(dto.Placa) <> '' then
     begin
       sql := sql + ' and placa = ' + QuotedStr(dto.Placa);
     end;

   end;



   if Configuracaodb.Consulta(sql) then
   begin

     lista.Clear;


     with configuracaodb do
     begin
        query.First;

        while not query.Eof  do
        begin

           veiculo := TVeiculo.Create;

           veiculo.Id      := query.FieldByName('id').asInteger;
           veiculo.Nome    := query.FieldByName('nome').AsString;
           veiculo.placa   := query.FieldByName('placa').AsString;
           veiculo.Valor   := query.FieldByName('valor').AsCurrency;
           veiculo.Status  := convertStrStatus(query.FieldByName('status').AsString);


           Lista.Add(veiculo);

           query.Next;

        end;

     end;


   end;

   result := Lista;


end;

constructor TRepositoryVeiculo.create;
begin
  Lista := TList<TVeiculo>.create;
  Configuracaodb := TconfiguracaoDb.Create;
end;

destructor TRepositoryVeiculo.destroy;
begin

  Lista.Free;
  ConfiguracaoDb.Free;

  //inherited;
end;

procedure TRepositoryVeiculo.Excluir(codigo: integer);
var
 sql : string;
begin
  sql := 'delete from veiculos where id = ' +  intToStr(codigo);
   Configuracaodb.ExecSql(sql);
end;

procedure TRepositoryVeiculo.SetLista(const Value: TList<TVeiculo>);
begin
  FLista := Value;
end;

end.
