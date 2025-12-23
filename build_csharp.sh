#!/bin/bash

echo "🔨 Compilazione della libreria C# con NativeAOT..."

# Determina l'architettura corrente
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    RID="osx-arm64"
else
    RID="osx-x64"
fi

echo "📦 Runtime Identifier: $RID"

# Compila la libreria C# come libreria nativa
dotnet publish CSharpFfiLib.csproj \
    -c Release \
    -r $RID \
    -p:PublishAot=true \
    -p:NativeLib=Shared \
    -p:SelfContained=true

if [ $? -eq 0 ]; then
    echo "✅ Compilazione completata!"
    echo "📁 Libreria in: CSharpFfiLib/bin/Release/net8.0/$RID/publish/"
    ls -lh CSharpFfiLib/bin/Release/net8.0/$RID/publish/*.dylib 2>/dev/null || echo "⚠️  File .dylib non trovato"
else
    echo "❌ Errore durante la compilazione"
    exit 1
fi
