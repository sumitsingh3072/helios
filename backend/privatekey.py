from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

# 1. Generate the Key Pair
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)

# 2. Export Private Key (For your .env file)
private_pem = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption()
)

# 3. Export Public Key (For Setu Dashboard)
public_key = private_key.public_key()
public_pem = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)

print("="*60)
print("COPY THIS INTO YOUR .env FILE (SETU_RAHASYA_PRIVATE_KEY):")
print("="*60)
# This flattens the key into a single line for .env compatibility
print(private_pem.decode('utf-8').replace('\n', '\\n'))

print("\n" + "="*60)
print("COPY THIS INTO SETU DASHBOARD (Project Settings -> Public Key):")
print("="*60)
print(public_pem.decode('utf-8'))