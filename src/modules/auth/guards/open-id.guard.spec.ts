import { OpenIdGuard } from './open-id.guard';

describe('OpenIdGuard', () => {
  it('should be defined', () => {
    expect(new OpenIdGuard()).toBeDefined();
  });
});
