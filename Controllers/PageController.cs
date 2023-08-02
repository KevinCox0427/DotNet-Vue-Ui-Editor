using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using dotnet.Models;
using dotnet.Data;

namespace dotnet.Controllers;

public class PageController : Controller
{
    private readonly ILogger<PageController> _logger;
    private readonly AppDbContext _db;

    public PageController(ILogger<PageController> logger, AppDbContext db) {
        _logger = logger;
        _db = db;
    }

    [HttpGet("{id}")]
    public IActionResult Index(int id) {
        Page pages = _db.Pages
            .Where(p => p.Id == id)
            .Include(p => p.Elements)
            .ThenInclude(e => e.Styles)
            .First();

        ViewData["Title"] = "Home";
        ViewData["PageProps"] = JsonConvert.SerializeObject(pages, new JsonSerializerSettings(){ 
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        });

        return View(pages);
    }

    [HttpPost("")]
    public Page Save([FromBody] Page page) {
        return page;
    }
}
