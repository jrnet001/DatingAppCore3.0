namespace DatingApp.API.DTOS
{
    public class PhotoForReturnDTO
    {
        public int Id { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public System.DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
    }
}