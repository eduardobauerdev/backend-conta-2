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
"[project]/frontend-ii/app/api/whatsapp/assign-tag/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const userId = cookieStore.get("auth_user_id")?.value;
        const userName = cookieStore.get("auth_user_name")?.value;
        const body = await request.json();
        const { chatId, etiquetaId } = body;
        console.log("📌 [ASSIGN-TAG] Início:", {
            chatId,
            etiquetaId
        });
        if (!chatId) {
            console.log("❌ [ASSIGN-TAG] Chat ID ausente");
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Chat ID é obrigatório"
            }, {
                status: 400
            });
        }
        if (!etiquetaId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Etiqueta ID é obrigatório"
            }, {
                status: 400
            });
        }
        // Verifica se o chat existe
        const { data: chatExists, error: checkError } = await supabase.from("chats").select("id, name, etiqueta_ids").eq("id", chatId).maybeSingle();
        if (checkError) {
            console.error("❌ [ASSIGN-TAG] Erro ao verificar chat:", checkError);
            throw checkError;
        }
        console.log("🔍 [ASSIGN-TAG] Chat existe?", {
            exists: !!chatExists
        });
        if (!chatExists) {
            console.log("➕ [ASSIGN-TAG] Criando novo chat...");
            // Chat não existe, cria um registro básico com a etiqueta
            const { error: insertError } = await supabase.from("chats").insert({
                id: chatId,
                name: chatId,
                is_archived: false,
                unread_count: 0,
                last_message_time: Date.now(),
                etiqueta_ids: [
                    etiquetaId
                ]
            });
            if (insertError) {
                console.error("❌ [ASSIGN-TAG] Erro ao inserir chat:", insertError);
                throw insertError;
            }
            console.log("✅ [ASSIGN-TAG] Chat criado com etiqueta");
        } else {
            console.log("🔄 [ASSIGN-TAG] Atualizando etiqueta do chat...");
            const currentIds = chatExists.etiqueta_ids || [];
            // Verifica se a etiqueta já existe
            if (currentIds.includes(etiquetaId)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: "Etiqueta já atribuída"
                });
            }
            // Adiciona a nova etiqueta ao array
            const newIds = [
                ...currentIds,
                etiquetaId
            ];
            const { error: updateError } = await supabase.from("chats").update({
                etiqueta_ids: newIds
            }).eq("id", chatId);
            if (updateError) {
                console.error("❌ [ASSIGN-TAG] Erro ao atualizar etiqueta:", updateError);
                throw updateError;
            }
            console.log("✅ [ASSIGN-TAG] Etiqueta adicionada ao array");
        }
        // Busca dados da etiqueta para o histórico
        const { data: etiquetaData } = await supabase.from("whatsapp_etiquetas").select("nome, cor").eq("id", etiquetaId).maybeSingle();
        // Registra no histórico unificado
        if (userId && userName) {
            await supabase.from("chat_history").insert({
                chat_id: chatId,
                chat_name: chatExists?.name || chatId,
                event_type: "etiqueta_added",
                event_data: {
                    etiqueta_id: etiquetaId,
                    etiqueta_nome: etiquetaData?.nome || "Etiqueta",
                    etiqueta_cor: etiquetaData?.cor || "#888888"
                },
                performed_by_id: userId,
                performed_by_name: userName
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Etiqueta atribuída com sucesso"
        });
    } catch (error) {
        console.error("❌ [ASSIGN-TAG] Erro geral:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error?.message || "Erro ao atribuir etiqueta",
            details: error?.details,
            hint: error?.hint
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const userId = cookieStore.get("auth_user_id")?.value;
        const userName = cookieStore.get("auth_user_name")?.value;
        const body = await request.json();
        const { chatId, etiquetaId } = body;
        console.log("🗑️ [REMOVE-TAG] Início:", {
            chatId,
            etiquetaId
        });
        if (!chatId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Chat ID é obrigatório"
            }, {
                status: 400
            });
        }
        // Busca dados da etiqueta e do chat para o histórico
        let etiquetaData = null;
        let chatData = null;
        if (etiquetaId) {
            const { data: etiqueta } = await supabase.from("whatsapp_etiquetas").select("nome, cor").eq("id", etiquetaId).maybeSingle();
            etiquetaData = etiqueta;
        }
        const { data: chat } = await supabase.from("chats").select("name, etiqueta_ids").eq("id", chatId).maybeSingle();
        chatData = chat;
        // Se etiquetaId específico, remove apenas essa do array
        if (etiquetaId) {
            // Usa array_remove do PostgreSQL para remover do array
            const { error } = await supabase.rpc('remove_etiqueta_from_chat', {
                p_chat_id: chatId,
                p_etiqueta_id: etiquetaId
            });
            // Se a função RPC não existir, fazemos manualmente
            if (error && error.message.includes('function')) {
                const { data: chat } = await supabase.from("chats").select("etiqueta_ids").eq("id", chatId).maybeSingle();
                if (chat) {
                    const newIds = (chat.etiqueta_ids || []).filter((id)=>id !== etiquetaId);
                    await supabase.from("chats").update({
                        etiqueta_ids: newIds
                    }).eq("id", chatId);
                }
            } else if (error) {
                throw error;
            }
        } else {
            const { error } = await supabase.from("chats").update({
                etiqueta_ids: []
            }).eq("id", chatId);
            if (error) throw error;
        }
        // Registra no histórico unificado
        if (userId && userName && etiquetaId) {
            await supabase.from("chat_history").insert({
                chat_id: chatId,
                chat_name: chatData?.name || chatId,
                event_type: "etiqueta_removed",
                event_data: {
                    etiqueta_id: etiquetaId,
                    etiqueta_nome: etiquetaData?.nome || "Etiqueta",
                    etiqueta_cor: etiquetaData?.cor || "#888888"
                },
                performed_by_id: userId,
                performed_by_name: userName
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Etiqueta(s) removida(s) com sucesso"
        });
    } catch (error) {
        console.error("❌ [REMOVE-TAG] Erro:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error?.message || "Erro ao remover etiqueta"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__360ebaac._.js.map