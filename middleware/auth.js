import jwt from "jsonwebtoken";

// admin authentication 
const verifyAdminApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"]; // API key sent in request headers
  
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
  
    next();
  };

  // JWT Authentication Middleware

const authenticateuser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token ||  !(req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer"))) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
    console.log(error);
    
  }
};

  
  export {verifyAdminApiKey,authenticateuser}
  