#!/bin/bash

echo "🔨 Building C# library with NativeAOT..."

# Determine current architecture
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    RID="osx-arm64"
else
    RID="osx-x64"
fi

echo "📦 Runtime Identifier: $RID"

# Compile C# library as native library
dotnet publish ../csharp/library/CSharpFfiLib.csproj \
    -c Release \
    -r $RID \
    -p:PublishAot=true \
    -p:NativeLib=Shared \
    -p:SelfContained=true

if [ $? -eq 0 ]; then
    echo "✅ Build completed!"
    echo "📁 Library in: csharp/library/bin/Release/net8.0/$RID/publish/"
    ls -lh ../csharp/library/bin/Release/net8.0/$RID/publish/*.dylib 2>/dev/null || echo "⚠️  .dylib file not found"
else
    echo "❌ Error during build"
    exit 1
fi
