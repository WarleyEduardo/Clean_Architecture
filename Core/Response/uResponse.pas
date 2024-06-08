unit uResponse;

interface

uses system.Generics.Collections;

type



 Tresponse = record

   success   : boolean;
   ErrorCode : integer;
   Message   : string;
   // invalid point Data      : TObjectlist<TObject>;

    Data      : Tlist<TObject>;

 end;

implementation

end.
