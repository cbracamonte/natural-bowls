import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RequestUser } from 'src/security/request-user';

type JwtPayload = {
  sub?: string;
  sid?: string | null;
  customerId?: string | null;
  tenantId?: string | null;
  platformScope?: boolean;
  role?: RequestUser['role'];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload): RequestUser {
    if (!payload.sub || !payload.role) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub,
      sessionId: payload.sid ?? null,
      customerId: payload.customerId ?? null,
      tenantId: payload.tenantId ?? null,
      platformScope: payload.platformScope ?? false,
      role: payload.role,
    };
  }
}
