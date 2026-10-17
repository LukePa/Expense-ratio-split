const EMAIL_CLAIM_TYPES = [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "email",
];

export function getAllowedEmails() {
    return (process.env.ALLOWED_EMAILS ?? "")
        .split(",")
        .map(email => email.trim().toLowerCase())
        .filter(email => email.length > 0);
}

// Easy Auth (Azure Container Apps built-in auth) injects these headers and strips client-supplied copies
export function getRequestEmail(req) {
    const principalHeader = req.get("x-ms-client-principal");
    if (principalHeader) {
        try {
            const principal = JSON.parse(Buffer.from(principalHeader, "base64").toString("utf8"));
            const emailClaim = principal.claims?.find(claim => EMAIL_CLAIM_TYPES.includes(claim.typ));
            if (emailClaim?.val) return emailClaim.val.trim().toLowerCase();
        } catch (e) {
            console.error("Failed to parse x-ms-client-principal header", e);
        }
    }

    const principalName = req.get("x-ms-client-principal-name");
    return principalName ? principalName.trim().toLowerCase() : null;
}

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char]);
}

function deny(req, res, status, email) {
    if (req.path.startsWith("/state") || req.path.startsWith("/me")) {
        res.status(status).send({success: false, reason: status === 401 ? "Unauthenticated" : "Forbidden"});
        return;
    }

    const who = email ? ` for ${escapeHtml(email)}` : "";
    res.status(status).contentType("text/html").send(
        `<!doctype html><html><head><meta charset="utf-8"><title>Access denied</title></head>` +
        `<body style="font-family:sans-serif;padding:2rem">` +
        `<h1>Access denied${who}</h1>` +
        `<p>This account is not allowed to use this app.</p>` +
        `<p><a href="/.auth/logout?post_logout_redirect_uri=/">Sign out and use a different account</a></p>` +
        `</body></html>`
    );
}

export function requireAllowedUser(req, res, next) {
    if (process.env.ENVIRONMENT === "dev") return next();

    const email = getRequestEmail(req);
    if (!email) return deny(req, res, 401, null);

    // Fail closed: an empty allowlist denies everyone
    if (!getAllowedEmails().includes(email)) return deny(req, res, 403, email);

    req.userEmail = email;
    next();
}
