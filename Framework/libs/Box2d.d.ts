declare module box2d {
    export var DEBUG;
    class b2World {
        public m_flag_newFixture: boolean;
        public m_flag_locked: boolean;
        public m_flag_clearForces: boolean;
        public m_contactManager: any;
        public m_bodyList: any;
        public m_jointList: any;
        public m_particleSystemList: any;
        public m_bodyCount: number;
        public m_jointCount: number;
        public m_gravity: b2Vec2;
        public m_out_gravity: any;
        public m_allowSleep: boolean;
        public m_destructionListener: any;
        public m_debugDraw: any;
        public m_inv_dt0: number;
        public m_warmStarting: boolean;
        public m_continuousPhysics: boolean;
        public m_subStepping: boolean;
        public m_stepComplete: boolean;
        public m_profile: any;
        public m_island: any;
        public s_stack: any;
        public m_controllerList: any;
        public m_controllerCount: number;
        public SetAllowSleeping(a): void;
        public GetAllowSleeping(): boolean;
        public SetWarmStarting(a): void;
        public GetWarmStarting(): boolean;
        public SetContinuousPhysics(a): void;
        public GetContinuousPhysics(): boolean;
        public SetSubStepping(a): void;
        public GetSubStepping(): boolean;
        public GetBodyList(): box2d.b2Body;
        public GetParticleSystemList(): any;
        public GetContactList(): any;
        public GetBodyCount(): number;
        public GetJointCount(): number;
        public GetContactCount(): number;
        public SetGravity(a: b2Vec2, b: boolean): void;
        public GetGravity(a: boolean): b2Vec2;
        public IsLocked(): boolean;
        public SetAutoClearForces(a): void;
        public GetAutoClearForces(): any;
        public GetContactManager(): any;
        public GetProfile(): any;
        public SetDestructionListener(a): void;
        public SetContactFilter(a): void;
        public SetContactListener(a): void;
        public SetDebugDraw(a): void;
        public CreateBody(a: b2BodyDef): b2BodyDef;
        public DestroyBody(a): void;
        public CreateJoint(a): any;
        public DestroyJoint(a): void;
        public CreateParticleSystem(a): any;
        public DestroyParticleSystem(a): void;
        public Solve(a): void;
        public SolveTOI(a): void;
        public Step(a, b, c, d): void;
        public ClearForces(): void;
        public QueryAABB(a: Function, b): void;
        public QueryShape(a: Function, b, c, d): void;
        public QueryPoint(a: Function, b, c): void;
        public RayCast(a: Function, b, c): void;
        public RayCastOne(a: Function, b): any;
        public RayCastAll(a: Function, b, c): any;
        public DrawShape(a, b): void;
        public DrawJoint(a): void;
        public DrawParticleSystem(a): void;
        public DrawDebugData(): void;
        public SetBroadPhase(a): void;
        public CalculateReasonableParticleIterations(a): any;
        public GetProxyCount(): number;
        public GetTreeHeight(): number;

    }
    class b2BuoyancyController {

        //         normal：指定水面法向量的方向，也就垂直水面的方向，通常保持默认的(0,-1)不变。
        public normal: any;
        // offset：指定水面的偏移量。注意它的方向与AS3中的y轴方向相反，也就是说如果我们想设置水面位置的y为200，那么offset属性应该是-200/30。
        public offset: number;
        // density：设置水的密度。确切的讲，是设置液体介质的密度。我们知道，只有漂浮物的密度小于液体介质的密度时，才可以漂浮在该介质上。(当然，要讲到刚结构的轮船可以漂浮在水上，就要讲到排水量要大于轮船的重量上了，话题就扯远啦，就此打住。)
        public density: number;
        // linearDrag：设置漂浮物在水中移动的阻尼值。或者我们可以把它想象成水的粘稠度。这个属性值越大，漂浮物移动的速度越慢。
        public linearDrag: number;
        // angularDrag：设置漂浮物在水中旋转的阻尼值。
        public angularDrag: number;
        // velocity：设置水流动的速度。
        public velocity: number;

        public AddBody(body: Laya.RigidBody): void;

    }

    class b2Vec2 {
        constructor(a?, b?);
        public x: number;
        public y: number;
        static ZERO: b2Vec2;
        static UNITX: b2Vec2;
        static UNITY: b2Vec2;
        static s_t0: b2Vec2;
        static s_t1: b2Vec2;
        static s_t2: b2Vec2;
        static s_t3: b2Vec2;
        static MakeArray(a): b2Vec2;
        public Clone(): b2Vec2;
        public SetZero(): b2Vec2;
        public Set(x, y): b2Vec2;
        public Copy(a: b2Vec2): b2Vec2;
        public SelfAdd(a: b2Vec2): b2Vec2;
        public SelfAddXY(a: b2Vec2): b2Vec2;
        public SelfSub(a: b2Vec2): b2Vec2;
        public SelfSubXY(a: b2Vec2): b2Vec2;
        public SelfMul(a: b2Vec2): b2Vec2;
        public SelfMulAdd(a: b2Vec2, b: b2Vec2): b2Vec2;
        public SelfMulSub(a: b2Vec2, b: b2Vec2): b2Vec2;
        public Dot(a: b2Vec2): b2Vec2;
        public Cross(a: b2Vec2): b2Vec2;
        public Length(): number;
        public LengthSquared(): number;
        public Normalize(): number;
        public SelfNormalize(): b2Vec2;
        public SelfRotate(a, b): b2Vec2;
        public SelfRotateAngle(a): b2Vec2;
        public IsValid(): boolean;
        public SelfMin(a: b2Vec2): b2Vec2;
        public SelfMax(a: b2Vec2): b2Vec2;
        public SelfAbs(): b2Vec2;
        public SelfNeg(): b2Vec2;
        public SelfSkew(): b2Vec2;

    }

    class b2CircleShape {
        constructor(a?: number);

        public m_p: b2Vec2;
        public Copy(a): b2CircleShape;
        public Clone(): b2CircleShape;
        public GetChildCount(): number;
        public TestPoint(a, b): boolean;
        public ComputeDistance(a, b, c, d);
        public RayCast(a, b, c, d): boolean;
        public ComputeAABB(a, b, c): void;
        public ComputeMass(a, b): void;
        public SetupDistanceProxy(a, b): void;
        public ComputeSubmergedArea(a, b, c, d): void;
    }

    class b2Fixture {
        public collider: Laya.ColliderBase;
        public m_density: number;
        public m_next: any;
        public m_body: any;
        public m_shape: any;
        public m_friction: number;
        public m_restitution: number;
        public m_proxies: any;
        public m_proxyCount: number;
        public m_filter: any;
        public m_isSensor: boolean;
        public m_userData: any;
        public GetType(): any;
        public GetShape(): any;
        public IsSensor(): any;
        public GetFilterData(): any;
        public GetUserData(): any;
        public SetUserData(): void;
        public GetBody(): any;
        public GetNext(): any;
        public SetDensity(density: number): void;
        public GetDensity(): number;
        public GetFriction(): number;
        public SetFriction(friction: number): void;
        public GetRestitution(): number;
        public SetRestitution(restitution: number): void;
        public TestPoint(point: any): any;
        public ComputeDistance(a, b, c): number;
        public RayCast(a, b, c): any;
        public GetMassData(a): any;
        public GetAABB(a): any;
        public Create(a, b): b2Fixture;
        public Destroy(): void;
        public CreateProxies(a, b): void;
        public DestroyProxies(a): void;
        public Synchronize(a, b, c): void;
        public SetFilterData(a): void;
        public Refilter(): void;
        public SetSensor(a): void;
    }

    class b2Body {
        constructor(a, world: box2d.b2World);
        public m_flag_islandFlag: boolean;
        public m_flag_awakeFlag: boolean;
        public m_flag_autoSleepFlag: boolean;
        public m_flag_bulletFlag: boolean;
        public m_flag_fixedRotationFlag: boolean;
        public m_flag_activeFlag: boolean;
        public m_islandIndex: number;
        public m_world: any;
        public m_xf: any;
        public m_out_xf: any;
        public m_xf0: any;
        public m_sweep: any;
        public m_out_sweep: any;
        public m_jointList: any;
        public m_contactList: any;
        public m_prev: any;
        public m_next: any;
        public m_linearVelocity: any;
        public m_out_linearVelocity: any;
        public m_angularVelocity: number;
        public m_linearDamping: number;
        public m_angularDamping: number;
        public m_gravityScale: number;
        public m_force: any;
        public m_torque: number;
        public m_sleepTime: number;
        public m_type: number;
        public m_mass: number;
        public m_invMass: number;
        public m_I: number;
        public m_invI: number;
        public m_userData: any;
        public m_fixtureList: any;
        public m_fixtureCount: number;
        public m_controllerList: any;
        public m_controllerCount: number;

        public CreateFixture(a, b): void;
        public CreateFixture_Def(a): b2Fixture;
        public CreateFixture_Shape_Density(a, b): b2Fixture;
        public DestroyFixture(a): void;
        public SetTransform(a, b, c): void;
        public SetTransform_V2_A(a, b): void;
        public SetTransform_X_Y_A(a, b, c): void;
        public SetTransform_X(a): void;
        public GetTransform(a): any;
        public GetPosition(a): any;
        public SetPosition(a): void;
        public SetPositionXY(a, b): void;
        public GetRotation(a): any;
        public SetRotation(a): void;
        public GetAngle(): any;
        public SetAngle(a): void;
        public GetLocalCenter(a): any;
        public SetLinearVelocity(a): void;
        public GetLinearVelocity(a): any;
        public SetAngularVelocity(a): void;
        public GetAngularVelocity(a): any;
        public GetDefinition(a): any;
        public ApplyForce(a, b, c): void;
        public ApplyForceToCenter(a, b): void;
        public ApplyTorque(a, b): void;
        public ApplyLinearImpulse(a, b, c): void;
        public ApplyLinearImpulseToCenter(a, b): void;
        public ApplyAngularImpulse(a, b): void;
        public GetMass(): any;
        public GetInertia(): any;
        public GetMassData(): any;
        public SetMassData(a): void;
        public ResetMassData(): void;
        public GetWorldPoint(a, b): any;
        public GetWorldVector(a, b): any;
        public GetLocalPoint(a, b): any;
        public GetLinearVelocityFromWorldPoint(a, b): any;
        public GetLinearVelocityFromLocalPoint(a, b): any;
        public GetLinearDamping(): any;
        public SetLinearDamping(a): void;
        public GetAngularDamping(): any;
        public SetAngularDamping(a): void;
        public GetGravityScale(): any;
        public SetGravityScale(a): void;
        public GetType(): number;
        public SetType(a): void;
        public IsBullet(): boolean;
        public SetBullet(a): void;
        public IsSleepingAllowed(): boolean;
        public SetSleepingAllowed(a): void;
        public IsAwake(): boolean;
        public SetAwake(a): void;
        public IsActive(): boolean;
        public SetActive(a): void;
        public IsFixedRotation(): boolean;
        public SetFixedRotation(a): void;
        public GetFixtureList(): any;
        public GetJointList(): any;
        public GetContactList(): any;
        public GetNext(): any;
        public GetUserData(): any;
        public SetUserData(a): void;
        public GetWorld(): any;
        public SynchronizeFixtures(): void;
        public SynchronizeTransform(): void;
        public ShouldCollide(a): void;
        public ShouldCollideConnected(a): boolean;
        public Advance(a): void;
        public GetControllerList(): any;
        public GetControllerCount(): number;
    }

    class b2BodyDef {
        constructor();
        public type: number;
        public position: b2Vec2;
        public linearVelocity: b2Vec2;
        public angle: number;
        public angularVelocity: number;
        public linearDamping: number;
        public angularDamping: number;
        public allowSleep: boolean;
        public awake: boolean;
        public fixedRotation: boolean;
        public bullet: boolean;
        public active: boolean;
        public userData: any;
        public gravityScale: number;
    }

    class b2BodyType {
        static b2_unknown: number;
        static b2_staticBody: number;
        static b2_kinematicBody: number;
        static b2_dynamicBody: number;
        static b2_bulletBody: number;
    }
    class b2FixtureDef {
        public shape: any;
        public userData: any;
        public friction: number;
        public restitution: number;
        public density: number;
        public isSensor: boolean;
        public filter: any;
    }
    class b2PolygonShape {
        public m_centroid: any;
        public m_vertices: any;
        public m_normals: any;
        public m_count: number;
        public Clone(): b2PolygonShape;
        public Copy(a: b2PolygonShape): b2PolygonShape;
        public SetAsBox(a, b, c, d): b2PolygonShape;
        public Set(a, b, c): b2PolygonShape;
        public GetChildCount(): number;
        public TestPoint(a, b): boolean;
        public ComputeDistance(a, b, c, d): number;
        public RayCast(a: Function, b, c, d): void;
        public ComputeAABB(a, b, c): void;
        public ComputeMass(a, b): void;
        public Validate(): boolean;
        public SetupDistanceProxy(a, b): any;
        public ComputeSubmergedArea(a, b, c, d): any;
        public ComputeCentroid(a, b, c): any;
    }

}