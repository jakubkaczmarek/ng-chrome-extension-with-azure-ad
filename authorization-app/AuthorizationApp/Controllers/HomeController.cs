using AuthorizationApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AuthorizationApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppSettings _appSettings;

        public HomeController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public ActionResult SignIn()
        {
            return GetView("signin.js");
        }

        public ActionResult SignOut()
        {
            return GetView("signout.js");
        }

        private ViewResult GetView(string scriptBundleName)
        {
            var model = new AuthorizationModel
            {
                ClientId = _appSettings.ClientId,
                TenantId = _appSettings.TenantId,
                ScriptBundleName = scriptBundleName
            };
            return View("SignInOut", model);
        }
    }
}
