using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Umbraco.Web.WebApi;

namespace DevSite
{
    public class ImagesController : UmbracoApiController
    {
        public async Task<HttpResponseMessage> GetJson(string tag)
        {
            var url = string.Format("https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags={0}", tag);

            using (var httpClient = new HttpClient())
            {
                var input = await httpClient.GetStringAsync(url);
                HttpContext.Current.Response.Write(input);
            }

            return new HttpResponseMessage();
        }
    }
}