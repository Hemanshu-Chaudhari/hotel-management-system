# AI Copilot Instructions

## Project Architecture

This is a **MERN-stack web application** with separated `backend/` and `frontend/` folders:

- **Backend**: Express.js server with Mongoose for MongoDB integration
- **Frontend**: Currently empty; will contain React/Vue/Angular application
- **Data Layer**: MongoDB (local instance at `mongodb://localhost:27017/hemanshu`)

## Backend Structure

### Key Files
- `backend/server.js` - Express app entry point (port 3000)
- `backend/models/login.js` - Mongoose schema for user authentication
- `backend/package.json` - Dependencies: express@5.1.0, mongoose@8.20.1

### Current Implementation Issues to Address
- Schema definition has syntax error (`require : true;` should be `required: true`)
- Missing database connection error handling
- No routes beyond root GET "/"
- Incomplete API structure (no POST routes for user login/registration)

## Development Workflows

### Starting the Backend
```bash
cd backend
npm install  # if node_modules not present
node server.js  # starts Express on port 3000
```

### MongoDB Connection
- Local instance required at `mongodb://localhost:27017`
- Database name: `hemanshu`
- Connection errors not currently handled

## Code Patterns & Conventions

### ES6 Modules
- Uses `import` syntax (configured in `package.json` with `"type": "module"`)
- Always use ES6 imports, not CommonJS `require()`

### Mongoose Schema Structure (Reference)
```javascript
// backend/models/login.js pattern
const userLogin = mongoose.Schema({
  name: {
    type: String,
    required: true  // Note: current code has syntax error
  }
})
```

## Next Steps for Development

1. **Fix existing schema errors** in `backend/models/login.js`
2. **Add error handling** to MongoDB connection in `server.js`
3. **Implement authentication routes** (POST /login, POST /register)
4. **Export the schema** so it can be used in routes
5. **Initialize frontend** application structure
6. **Add middleware** for JSON body parsing (currently `app.use(express())` is incorrect)

## Integration Points

- **Frontend-Backend**: Will communicate via HTTP/REST API on port 3000
- **Backend-Database**: Mongoose ODM handles MongoDB queries
- **External**: MongoDB server must be running independently

## Important Notes

- The project appears to be in early development stages
- No authentication middleware or protected routes currently implemented
- Frontend is not yet scaffolded
- Consider adding error handling and logging utilities before expanding routes
