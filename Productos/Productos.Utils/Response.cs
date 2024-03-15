namespace Productos.Utils
{
    public class Response
    {
        public int code {  get; set; }
        public string message { get; set; }
        public Object data { get; set; }

        public Response(int Code , string Message) 
        {
            code = Code;
            message = Message;
        }

        public Response(int Code, string Message,Object Objecto)
        {
            code = Code;
            message = Message;
            data = Objecto;
        }


    }
}