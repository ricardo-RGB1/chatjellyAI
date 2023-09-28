import { PrismaClient } from '@prisma/client'

 declare global {
    var prisma: PrismaClient | undefined;
 }

 const prismadb = globalThis.prisma || new PrismaClient();
 if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;

/*
This is a TypeScript module that exports a default instance of the PrismaClient class from the @prisma/client package. The PrismaClient is a type-safe database client that can be used to interact with a database.

The module also declares a global variable prisma of type PrismaClient | undefined and initializes it to the global prisma object if it exists, or creates a new instance of PrismaClient if it doesn't.

Finally, if the NODE_ENV environment variable is set to 'development', the prisma object is assigned to the global prisma variable. This allows the prisma object to be reused across multiple requests in development mode, which can improve performance.
*/
 