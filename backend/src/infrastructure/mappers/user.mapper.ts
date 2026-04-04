import { User } from "src/modules/auth/domain/entities/user.entity";
import { Role } from "src/security/roles.enum";

type UserRow = {
  id: string;
  tenant_id: string | null;
  email: string | null;
  name: string;
  image_url?: string | null;
  avatar_url?: string | null;
  address?: string | null;
  birth_date?: string | Date | null;
  gender?: string | null;
  email_verified: boolean;
  email_verified_at?: string | Date | null;
  marketing_opt_in: boolean;
  marketing_consent_at?: string | Date | null;
  terms_accepted_at?: string | Date | null;
  privacy_accepted_at?: string | Date | null;
  created_at: string | Date;
  updated_at: string | Date;
  role: Role;
};

export class UserMapper {
  static toDomain(row: UserRow): User {
    return new User(
      row.id,
      row.tenant_id ?? null,
      row.email ?? null,
      row.name,
      row.image_url ?? row.avatar_url ?? null,
      row.address ?? null,
      row.birth_date ? new Date(row.birth_date) : null,
      row.gender ?? null,
      Boolean(row.email_verified),
      row.email_verified_at ? new Date(row.email_verified_at) : null,
      Boolean(row.marketing_opt_in),
      row.marketing_consent_at ? new Date(row.marketing_consent_at) : null,
      row.terms_accepted_at ? new Date(row.terms_accepted_at) : null,
      row.privacy_accepted_at ? new Date(row.privacy_accepted_at) : null,
      new Date(row.created_at),
      new Date(row.updated_at),
      row.role as Role,
    );
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      tenant_id: user.getTenantId(),
      email: user.getEmail(),
      name: user.getName(),
      image_url: user.getImageUrl(),
      address: user.getAddress(),
      birth_date: user.getBirthDate(),
      gender: user.getGender(),
      email_verified: user.isEmailVerified(),
      email_verified_at: user.getEmailVerifiedAt(),
      marketing_opt_in: user.isMarketingOptedIn(),
      marketing_consent_at: user.getMarketingConsentAt(),
      terms_accepted_at: user.getTermsAcceptedAt(),
      privacy_accepted_at: user.getPrivacyAcceptedAt(),
      created_at: user.createdAt,
      updated_at: user.getUpdatedAt(),
      role: user.getRole(),
    };
  }
}
