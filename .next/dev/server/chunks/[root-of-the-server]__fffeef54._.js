module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createServerClient,
    "createServerClient",
    ()=>createServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createServerClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hqzjzjnzkggzrppudegv.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxemp6am56a2dnenJwcHVkZWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODYxNDcsImV4cCI6MjA4MDA2MjE0N30.vW6nKlrm6BwDbHLos-5dcwJFT31lMsHGLdD1XgMXOBY"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
;
}),
"[project]/app/api/whatsapp/qr/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
function joinUrl(base, path) {
    const cleanBase = base.replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '');
    return `${cleanBase}/${cleanPath}`;
}
function getQrFromResponse(data) {
    const raw = data?.qrCode || data?.qr_code || data?.qrCodeImageUrl || null;
    const base64 = raw || data?.qrCodeBase64 || null;
    if (!base64) return null;
    if (typeof base64 === 'string' && base64.startsWith('data:image')) {
        return base64;
    }
    return `data:image/png;base64,${base64}`;
}
async function GET() {
    console.log('[v0] 🔄 Iniciando requisição para obter QR Code');
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        console.log('[v0] ✅ Cliente Supabase criado com sucesso');
        const { data: config, error: configError } = await supabase.from('whatsapp_config').select('*').single();
        console.log('[v0] 📊 Configuração do banco:', {
            hasConfig: !!config,
            hasError: !!configError,
            serverUrl: config?.server_url
        });
        if (configError || !config || !config.server_url) {
            console.log('[v0] ❌ Configuração não encontrada ou URL do servidor ausente');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Configure a URL da API do servidor WhatsApp primeiro'
            }, {
                status: 400
            });
        }
        const targetUrl = joinUrl(config.server_url, 'qr');
        console.log('[v0] 🌐 Fazendo requisição para:', targetUrl);
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 15000) // 15 second timeout for QR
        ;
        try {
            const response = await fetch(targetUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            console.log('[v0] 📡 Resposta do servidor Railway:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                contentType: response.headers.get('content-type')
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.log('[v0] ❌ Erro na resposta do servidor:', errorText);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: 'O servidor WhatsApp está indisponível. Verifique se o serviço está ativo no Railway.',
                    error: `Status ${response.status}: ${errorText}`
                }, {
                    status: 200
                });
            }
            const contentType = response.headers.get('content-type') || '';
            let qrImage = null;
            if (contentType.includes('application/json')) {
                // Backend returned JSON
                const data = await response.json();
                console.log('[v0] 📦 Resposta JSON do /qr:', data);
                qrImage = getQrFromResponse(data);
            } else {
                // Backend returned plain text (likely a data:image URL directly)
                const text = await response.text();
                console.log('[v0] 📦 Resposta texto do /qr:', {
                    textLength: text.length,
                    isDataUrl: text.startsWith('data:image')
                });
                if (text.startsWith('data:image')) {
                    qrImage = text;
                } else {
                    qrImage = getQrFromResponse({
                        qrCode: text
                    });
                }
            }
            if (!qrImage) {
                console.error('[v0] ❌ Não foi possível extrair QR Code da resposta');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: 'O servidor não retornou um QR Code válido. Tente novamente.'
                }, {
                    status: 200
                });
            }
            console.log('[v0] ✅ QR Code extraído com sucesso:', {
                qrLength: qrImage.length,
                isDataUrl: qrImage.startsWith('data:image')
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                qr: qrImage,
                message: 'QR Code gerado com sucesso'
            });
        } catch (fetchError) {
            clearTimeout(timeoutId);
            if (fetchError instanceof Error) {
                if (fetchError.name === 'AbortError') {
                    console.error('[v0] ⏱️ Timeout ao obter QR Code:', fetchError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: false,
                        message: 'O servidor WhatsApp não respondeu em tempo hábil. Tente novamente.',
                        error: 'Timeout após 15 segundos'
                    }, {
                        status: 200
                    });
                }
                console.error('[v0] 🔌 Erro de conexão ao obter QR:', fetchError.message);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: 'Não foi possível conectar ao servidor WhatsApp. Verifique a URL configurada.',
                    error: fetchError.message
                }, {
                    status: 200
                });
            }
            throw fetchError;
        }
    } catch (error) {
        console.error('[v0] 💥 Erro ao obter QR Code:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: 'Erro interno ao gerar QR Code. Tente novamente.',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fffeef54._.js.map