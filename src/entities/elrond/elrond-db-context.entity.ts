// type DbContext = any;
//
// class ElrondDbContext: DbContext {
//
// public ElrondDbContext(DbContextOptions<ElrondDbContext> options)
// : base(options)
//   {
//
//   }
//
// public DbSet<ErlondTransaction> Transactions { get; set; }
//
// protected override void OnModelCreating(ModelBuilder modelBuilder)
//   {
//     modelBuilder.Entity<ErlondTransaction>().ToTable("elrond_transaction");
//
//     base.OnModelCreating(modelBuilder);
//   }
// }
