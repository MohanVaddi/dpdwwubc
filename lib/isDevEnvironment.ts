let inDevEnvironment = false;
let backend_uri = process.env['prod_backend'];

if (process && process.env.NODE_ENV === 'development') {
    inDevEnvironment = true;
    backend_uri = process.env['backend'];
}

export { inDevEnvironment, backend_uri };
