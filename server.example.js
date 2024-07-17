
const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
      const content = await fs.readFile(path.join(basePath, "index.html"));
  
      res.writeHead(200, {
        ["Content-type"]: "text/html",
      });
  
      res.end(content);
    } else if (req.method === "POST") {
      const body = [];
  
      req.on("data", (data) => {
        body.push(Buffer.from(data));
      });
  
      req.on("end", async () => {
        const  title =  body.toString().split("=")[1].replaceAll("+", " ");
        res.writeHead(200, {
          ["Content-type"]: "text/plain; charset=utf-8",
        });
        await addNote(title);
  
  
        res.end(`Title=${title}`);
      });
  
      
    }
  });
  
  server.listen(port, () => {
    console.log(chalk.green(`server has been started on port: ${port}...`));
  });
  