@echo off

:: Generate private key
ssh-keygen -t rsa -b 4096 -m PEM -f private.key -E SHA512

echo Private and public keys generated successfully.
