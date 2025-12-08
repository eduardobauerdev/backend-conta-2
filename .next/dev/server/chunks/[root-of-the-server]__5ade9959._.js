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
"[project]/frontend-ii/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createServerClient,
    "createServerClient",
    ()=>createServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createServerClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hqzjzjnzkggzrppudegv.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxemp6am56a2dnenJwcHVkZWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODYxNDcsImV4cCI6MjA4MDA2MjE0N30.vW6nKlrm6BwDbHLos-5dcwJFT31lMsHGLdD1XgMXOBY"), {
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
"[project]/frontend-ii/app/api/whatsapp/etiquetas/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from("whatsapp_etiquetas").select("*").order("nome", {
            ascending: true
        });
        if (error) throw error;
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            etiquetas: data || []
        });
    } catch (error) {
        console.error("Erro ao carregar etiquetas:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro ao carregar etiquetas"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const body = await request.json();
        const { nome, cor, descricao } = body;
        if (!nome || !cor) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Nome e cor são obrigatórios"
            }, {
                status: 400
            });
        }
        // Pega o ID e nome do usuário autenticado
        const userId = cookieStore.get("auth_user_id")?.value;
        let userName = "Sistema";
        if (userId) {
            const { data: userProfile } = await supabase.from("perfis").select("nome").eq("id", userId).single();
            if (userProfile) userName = userProfile.nome;
        }
        const { data, error } = await supabase.from("whatsapp_etiquetas").insert({
            nome: nome.trim(),
            cor: cor.trim(),
            descricao: descricao?.trim() || null,
            created_by_id: userId || null,
            created_by_name: userName
        }).select().single();
        if (error) throw error;
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            etiqueta: data
        });
    } catch (error) {
        console.error("Erro ao criar etiqueta:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro ao criar etiqueta"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const body = await request.json();
        const { id, nome, cor, descricao } = body;
        if (!id || !nome || !cor) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "ID, nome e cor são obrigatórios"
            }, {
                status: 400
            });
        }
        const { data, error } = await supabase.from("whatsapp_etiquetas").update({
            nome: nome.trim(),
            cor: cor.trim(),
            descricao: descricao?.trim() || null,
            updated_at: new Date().toISOString()
        }).eq("id", id).select().single();
        if (error) throw error;
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            etiqueta: data
        });
    } catch (error) {
        console.error("Erro ao atualizar etiqueta:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro ao atualizar etiqueta"
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "ID é obrigatório"
            }, {
                status: 400
            });
        }
        // Primeiro, remove a etiqueta de todos os chats que a contêm
        // Usa a função RPC para remover a etiqueta do array etiqueta_ids
        const { error: removeError } = await supabase.rpc('remove_etiqueta_from_all_chats', {
            p_etiqueta_id: id
        });
        // Se a função RPC não existir, faz a remoção manualmente
        if (removeError && removeError.code === '42883') {
            // Função não existe, faz update manual
            // Busca todos os chats que têm essa etiqueta
            const { data: chatsWithEtiqueta } = await supabase.from('chats').select('id, etiqueta_ids').contains('etiqueta_ids', [
                id
            ]);
            if (chatsWithEtiqueta && chatsWithEtiqueta.length > 0) {
                // Remove a etiqueta de cada chat
                for (const chat of chatsWithEtiqueta){
                    const newEtiquetaIds = (chat.etiqueta_ids || []).filter((eid)=>eid !== id);
                    await supabase.from('chats').update({
                        etiqueta_ids: newEtiquetaIds
                    }).eq('id', chat.id);
                }
            }
        } else if (removeError) {
            console.error('Erro ao remover etiqueta dos chats:', removeError);
        // Continua com a exclusão mesmo se houver erro na limpeza
        }
        // Agora exclui a etiqueta
        const { error } = await supabase.from("whatsapp_etiquetas").delete().eq("id", id);
        if (error) throw error;
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error("Erro ao deletar etiqueta:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro ao deletar etiqueta"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5ade9959._.js.map